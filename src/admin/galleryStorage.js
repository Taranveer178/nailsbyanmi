import { adminSections } from "./adminData";
import {
  eyelashesGallery,
  hairGallery,
  nailsGallery,
} from "../data/galleryData";

export const ADMIN_SECTIONS_STORAGE_KEY = "glam-by-anmi-admin-sections";
const STORAGE_VERSION = 2;

const LEGACY_ITEMS_TO_REMOVE = {
  nails: new Set(["ns-1", "ns-2", "ns-3", "ns-4"]),
  transformations: new Set(["tr-1", "tr-2"]),
  "lookbook-nails": new Set(["ln-1", "ln-2", "ln-3"]),
  "lookbook-hair": new Set(["lh-1", "lh-2"]),
  "lookbook-lashes": new Set(["ll-1", "ll-2"]),
};

const LEGACY_STUDIO_DESCRIPTIONS = {
  "01": "Deep scalp nourishment",
  "02": "Sculpted extensions",
  "03": "Hand-painted dimension",
  "04": "Minimalist chrome & bridal",
  "05": "Weightless movement",
};

const LEGACY_STUDIO_ITEM_IDS = {
  "st-1": "01",
  "st-2": "02",
  "st-3": "03",
  "st-4": "04",
  "st-5": "05",
};

export const getDeletedItemKey = (sectionId, itemId) =>
  `${sectionId}:${itemId}`;

const isUnsplashImage = (image) =>
  typeof image === "string" && image.includes("images.unsplash.com");
const isCloudinaryImage = (image) =>
  typeof image === "string" && image.includes("res.cloudinary.com");
const normalizePublicImagePath = (image) =>
  typeof image === "string" && image.startsWith("/")
    ? image.replace(/%26/gi, "&")
    : image;

function mergeSavedSections(savedSections, deletedItemIds) {
  const knownSectionIds = new Set(adminSections.map((section) => section.id));
  const mergedSections = adminSections.map((defaultSection) => {
    const savedSection = savedSections.find(
      (section) => section.id === defaultSection.id
    );
    if (!savedSection) return defaultSection;

    const defaultItemIds = new Set(
      defaultSection.items.map((item) => item.id)
    );
    const savedItems = savedSection.items.map((item) => {
      const currentId =
        defaultSection.id === "studio"
          ? LEGACY_STUDIO_ITEM_IDS[item.id] || item.id
          : item.id;
      const currentItem =
        defaultSection.items.find((entry) => entry.id === currentId);
      const normalizedItem =
        currentId === item.id ? item : { ...item, id: currentId };
      if (
        defaultSection.id === "transformations" &&
        currentItem &&
        / — (Before|After)$/.test(normalizedItem.title)
      ) {
        return { ...normalizedItem, title: currentItem.title };
      }
      return normalizedItem;
    });
    const savedItemsById = new Map(
      savedItems.map((item) => [item.id, item])
    );
    const legacyItemIds =
      LEGACY_ITEMS_TO_REMOVE[defaultSection.id] || new Set();
    const items = defaultSection.items
      .filter(
        (item) =>
          !deletedItemIds.includes(
            getDeletedItemKey(defaultSection.id, item.id)
          )
      )
      .map((item) => {
        const savedItem = savedItemsById.get(item.id);
        if (!savedItem) return item;

        const normalizedSavedItem = {
          ...savedItem,
          image: normalizePublicImagePath(savedItem.image),
        };
        const replaceDemoImage =
          (isUnsplashImage(normalizedSavedItem.image) &&
            !isUnsplashImage(item.image)) ||
          (defaultSection.id === "nails" &&
            !isCloudinaryImage(normalizedSavedItem.image));
        const restoreStudioDescription =
          defaultSection.id === "studio" &&
          normalizedSavedItem.meta === LEGACY_STUDIO_DESCRIPTIONS[item.id];
        const restoreLegacyStudioVisibility =
          defaultSection.id === "studio" &&
          item.id === "05" &&
          normalizedSavedItem.status === "hidden" &&
          !isCloudinaryImage(normalizedSavedItem.image);
        if (
          !replaceDemoImage &&
          !restoreStudioDescription &&
          !restoreLegacyStudioVisibility
        ) {
          return { ...item, ...normalizedSavedItem };
        }

        return {
          ...item,
          ...normalizedSavedItem,
          image: replaceDemoImage ? item.image : normalizedSavedItem.image,
          meta: restoreStudioDescription ? item.meta : normalizedSavedItem.meta,
          status: restoreLegacyStudioVisibility
            ? item.status
            : normalizedSavedItem.status,
        };
      });
    const additionalItems = savedItems.filter(
      (item) =>
        !defaultItemIds.has(item.id) &&
        !deletedItemIds.includes(
          getDeletedItemKey(defaultSection.id, item.id)
        ) &&
        !legacyItemIds.has(item.id)
    );

    return {
      ...defaultSection,
      ...savedSection,
      number: defaultSection.number,
      name: defaultSection.name,
      subtitle: defaultSection.subtitle,
      items: [...items, ...additionalItems],
    };
  });

  return [
    ...mergedSections,
    ...savedSections.filter((section) => !knownSectionIds.has(section.id)),
  ];
}

function migrateDeletedItemIds(savedSections, deletedItemIds) {
  return deletedItemIds.flatMap((deletedItemId) => {
    if (deletedItemId.includes(":")) return [deletedItemId];

    return adminSections.flatMap((section) => {
      const currentItemId =
        section.id === "studio"
          ? LEGACY_STUDIO_ITEM_IDS[deletedItemId] || deletedItemId
          : deletedItemId;
      if (!section.items.some((item) => item.id === currentItemId)) return [];
      const savedSection = savedSections.find(
        (entry) => entry.id === section.id
      );
      const itemExistsInSavedSection = savedSection?.items.some(
        (item) =>
          (section.id === "studio"
            ? LEGACY_STUDIO_ITEM_IDS[item.id] || item.id
            : item.id) === currentItemId
      );
      return savedSection && !itemExistsInSavedSection
        ? [getDeletedItemKey(section.id, currentItemId)]
        : [];
    });
  });
}

export function loadAdminState() {
  try {
    const savedSections = localStorage.getItem(ADMIN_SECTIONS_STORAGE_KEY);
    if (!savedSections) {
      return { sections: adminSections, deletedItemIds: [] };
    }

    const parsed = JSON.parse(savedSections);
    const isLegacyData = Array.isArray(parsed);
    const parsedSections = isLegacyData ? parsed : parsed.sections;
    const savedDeletedItemIds = isLegacyData ? [] : parsed.deletedItemIds;
    if (
      !Array.isArray(parsedSections) ||
      (!isLegacyData &&
        (parsed.version !== STORAGE_VERSION ||
          !Array.isArray(savedDeletedItemIds))) ||
      parsedSections.some(
        (section) =>
          typeof section.id !== "string" ||
          !Array.isArray(section.items) ||
          section.items.some(
            (item) =>
              typeof item.id !== "string" ||
              typeof item.title !== "string" ||
              typeof item.image !== "string"
          )
      )
    ) {
      throw new Error("Saved admin gallery data has an invalid format.");
    }
    const deletedItemIds = migrateDeletedItemIds(
      parsedSections,
      savedDeletedItemIds
    );
    return {
      sections: mergeSavedSections(parsedSections, deletedItemIds),
      deletedItemIds,
    };
  } catch (error) {
    console.error("Could not read saved gallery data.", error);
    return { sections: adminSections, deletedItemIds: [] };
  }
}

export function loadAdminSections() {
  return loadAdminState().sections;
}

export function saveAdminState(sections, deletedItemIds) {
  localStorage.setItem(
    ADMIN_SECTIONS_STORAGE_KEY,
    JSON.stringify({
      version: STORAGE_VERSION,
      sections,
      deletedItemIds,
    })
  );
}

export function getAdminSectionItems(sectionId) {
  const section = loadAdminSections().find((entry) => entry.id === sectionId);
  return section?.items || [];
}

export function getVisibleAdminItems(sectionId) {
  return getAdminSectionItems(sectionId).filter(
    (item) => item.status !== "hidden"
  );
}

export function getGalleryCollections() {
  const sections = loadAdminSections();
  const getItems = (sectionId, defaults) => {
    const section = sections.find((entry) => entry.id === sectionId);
    if (!section) return defaults;
    return section.items
      .filter((item) => item.status !== "hidden")
      .map((item) => ({
        id: item.id,
        title: item.title,
        tag: item.tag,
        duration: item.meta,
        image: item.image,
      }));
  };

  return {
    nails: getItems("lookbook-nails", nailsGallery),
    hair: getItems("lookbook-hair", hairGallery),
    eyelashes: getItems("lookbook-lashes", eyelashesGallery),
  };
}

export function getHomeGalleryItems() {
  const collections = getGalleryCollections();
  const allItems = [...collections.nails, ...collections.hair, ...collections.eyelashes];
  return allItems.slice(0, 12).map((item) => ({
    id: item.id,
    title: item.title,
    category: item.tag,
    image: item.image,
    sourceId: item.id,
  }));
}
