import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Plus, ImageOff } from "lucide-react";
import {
  getDeletedItemKey,
  saveAdminState,
  useAdminState,
  useAdminSyncStatus,
} from "./galleryStorage";
import { getFirebaseAuth, getFirebaseDatabase } from "../firebase";
import AdminHeader from "./AdminHeader";
import AdminLogin from "./AdminLogin";
import SectionList from "./SectionList";
import ImageCard from "./ImageCard";
import ImageEditModal from "./ImageEditModal";

export default function AdminDashboard({ onBackToSite }) {
  const { sections, deletedItemIds } = useAdminState();
  const syncStatus = useAdminSyncStatus();
  const [accessState, setAccessState] = useState("checking");
  const [authNotice, setAuthNotice] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("hero");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    let active = true;
    let unsubscribe;

    const initializeAuth = async () => {
      try {
        const [auth, database] = await Promise.all([
          getFirebaseAuth(),
          getFirebaseDatabase(),
        ]);
        if (!active) return;

        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!active) return;
          if (!user) {
            setAccessState("signed-out");
            return;
          }

          setAccessState("checking");
          try {
            const adminRecord = await getDoc(
              doc(database, "admins", user.uid)
            );
            if (!active) return;
            if (!adminRecord.exists()) {
              await signOut(auth);
              if (active) {
                setAuthNotice("This account does not have admin access.");
                setAccessState("signed-out");
              }
              return;
            }

            setAuthNotice("");
            setAccessState("authorized");
          } catch (error) {
            console.error("Could not verify admin access.", error);
            await signOut(auth).catch(() => {});
            if (active) {
              setAuthNotice(
                "Admin access could not be verified. Check Firebase Authentication, Firestore, and the deployed security rules."
              );
              setAccessState("signed-out");
            }
          }
        });
      } catch (error) {
        console.error("Could not initialize admin authentication.", error);
        if (active) {
          setAuthNotice("Firebase authentication could not be initialized.");
          setAccessState("signed-out");
        }
      }
    };

    initializeAuth();
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const updateSections = async (update, deletedItemId) => {
    const updatedSections = update(sections);
    const updatedDeletedItemIds = deletedItemId
      ? [...deletedItemIds, deletedItemId]
      : deletedItemIds;
    try {
      await saveAdminState(updatedSections, updatedDeletedItemIds);
      setStorageError("");
    } catch (error) {
      console.error("Could not save admin gallery changes.", error);
      setStorageError(
        "Cloud save failed. This browser has a local copy, but other visitors will not see this change until Firebase sync is restored."
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(await getFirebaseAuth());
    } catch (error) {
      console.error("Could not sign out of the admin panel.", error);
      setStorageError("Could not sign out. Please try again.");
    }
  };

  if (accessState === "checking") {
    return (
      <div className="min-h-screen bg-[#F6F5F1] p-8 text-[#2F2C29] grid place-items-center">
        <p role="status" className="text-[14px]">Checking admin access…</p>
      </div>
    );
  }

  if (accessState !== "authorized") {
    return <AdminLogin onBackToSite={onBackToSite} notice={authNotice} />;
  }

  const activeSection =
    sections.find((sec) => sec.id === activeSectionId) || sections[0];

  // Open modal to add a new image to the current section
  const handleOpenAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  // Open modal to edit an existing image
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // Save an item; gallery content is persisted in browser storage below.
  const handleSaveItem = (savedItem, targetGallerySectionId) => {
    if (targetGallerySectionId) {
      setActiveSectionId(targetGallerySectionId);
    }
    updateSections((prev) => {
      if (targetGallerySectionId) {
        return prev.map((sec) => {
          if (["lookbook-nails", "lookbook-hair", "lookbook-lashes"].includes(sec.id)) {
            const itemExists = sec.items.some((item) => item.id === savedItem.id);
            return {
              ...sec,
              items:
                sec.id === targetGallerySectionId
                  ? itemExists
                    ? sec.items.map((item) =>
                        item.id === savedItem.id ? savedItem : item
                      )
                    : [savedItem, ...sec.items]
                  : sec.items.filter((item) => item.id !== savedItem.id),
            };
          }
          return sec;
        });
      }

      return prev.map((sec) => {
        if (sec.id !== activeSection.id) return sec;
        const exists = sec.items.some((i) => i.id === savedItem.id);
        return {
          ...sec,
          items: exists
            ? sec.items.map((i) => (i.id === savedItem.id ? savedItem : i))
            : [savedItem, ...sec.items],
        };
      });
    });
  };

  // Toggle "Remove" (hide from live site without deleting)
  const handleToggleRemove = (itemId) => {
    updateSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== activeSection.id) return sec;
        return {
          ...sec,
          items: sec.items.map((i) =>
            i.id === itemId
              ? { ...i, status: i.status === "hidden" ? "visible" : "hidden" }
              : i
          ),
        };
      })
    );
  };

  // Permanently delete image from section
  const handleDelete = (itemId) => {
    updateSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== activeSection.id) return sec;
        return {
          ...sec,
          items: sec.items.filter((i) => i.id !== itemId),
        };
      }),
      getDeletedItemKey(activeSection.id, itemId)
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#2F2C29] flex flex-col">
      {/* Top Sticky Admin Bar */}
      <AdminHeader
        onBackToSite={onBackToSite}
        onOpenAddModal={handleOpenAdd}
        onSignOut={handleSignOut}
        syncStatus={syncStatus.state}
      />

      {/* Main Content Layout: Mobile Stacked / Desktop Sidebar + Grid */}
      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col lg:flex-row lg:gap-8 lg:px-12 lg:py-10">
        {/* Section Selector List */}
        <SectionList
          sections={sections}
          activeSectionId={activeSection.id}
          onSelectSection={setActiveSectionId}
        />

        {/* Active Section Images Area */}
        <main className="flex-1 px-4 sm:px-8 lg:px-0 py-6 lg:py-0">
          {storageError && (
            <p
              role="alert"
              className="mb-5 rounded-[3px] border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-800"
            >
              {storageError}
            </p>
          )}
          {syncStatus.state === "error" && !storageError && (
            <p
              role="alert"
              className="mb-5 rounded-[3px] border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-800"
            >
              Live settings sync is unavailable. Changes may remain local until Firestore is reachable.
            </p>
          )}
          {/* Active Section Banner */}
          <div className="bg-white border border-[#2F2C29]/12 rounded-[3px] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="bg-[#2F2C29] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                  SECTION {activeSection.number}
                </span>
                <span className="text-[12px] font-medium text-[#8A755F]">
                  {activeSection.items.length}{" "}
                  {activeSection.items.length === 1 ? "photo" : "photos"}
                </span>
              </div>

              <h2 className="text-[22px] sm:text-[26px] font-medium text-[#2F2C29] leading-tight">
                {activeSection.name}
              </h2>
              <p className="text-[13.5px] text-[#6E6961] mt-1">
                {activeSection.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 bg-[#2F2C29] hover:bg-[#8A755F] text-[#F6F5F1] text-[13.5px] font-medium px-4 py-2.5 rounded-[3px] transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add to {activeSection.name}</span>
            </button>
          </div>

          {/* Image Cards Grid */}
          {activeSection.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {activeSection.items.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onEdit={handleOpenEdit}
                  onToggleRemove={handleToggleRemove}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-[#2F2C29]/25 rounded-[3px] p-12 text-center flex flex-col items-center">
              <ImageOff className="w-8 h-8 text-[#8A755F] mb-3" />
              <h3 className="text-[18px] font-medium text-[#2F2C29]">
                No images in {activeSection.name}
              </h3>
              <p className="text-[13.5px] text-[#6E6961] mt-1 mb-5 max-w-sm">
                Tap the button below to upload a new photo to this section.
              </p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 bg-[#2F2C29] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[3px] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Image</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Bottom-Sheet Modal */}
      {modalOpen && (
        <ImageEditModal
          key={editingItem?.id || `new-${activeSection.id}`}
          isOpen={modalOpen}
          item={editingItem}
          sectionId={activeSection.id}
          sectionName={activeSection.name}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
}