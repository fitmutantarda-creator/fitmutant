import { useState, useCallback } from "react";

/**
 * useModal — ConfirmModal ile birlikte kullanılacak custom hook.
 *
 * Kullanım:
 *   const { modalProps, showConfirm, showAlert } = useModal();
 *
 *   // Onay gerektiren işlem:
 *   const ok = await showConfirm({ title: "Sil?", message: "Emin misiniz?" });
 *   if (ok) { ...sil... }
 *
 *   // Sadece bilgi:
 *   await showAlert({ title: "Hata", message: "Resim yüklenemedi.", type: "alert" });
 *
 *   // JSX içinde:
 *   <ConfirmModal {...modalProps} />
 */
const useModal = () => {
  const [state, setState] = useState({
    isOpen: false,
    type: "confirm",
    title: "",
    message: "",
    confirmText: undefined,
    cancelText: "İptal",
    resolve: null,
  });

  /**
   * Dahili tetikleyici — Promise döner (true: onaylandı, false: iptal)
   */
  const openModal = useCallback(
    ({ type = "confirm", title, message, confirmText, cancelText = "İptal" }) =>
      new Promise((resolve) => {
        setState({
          isOpen: true,
          type,
          title,
          message,
          confirmText,
          cancelText,
          resolve,
        });
      }),
    []
  );

  const handleConfirm = useCallback(() => {
    setState((prev) => {
      prev.resolve?.(true);
      return { ...prev, isOpen: false };
    });
  }, []);

  const handleCancel = useCallback(() => {
    setState((prev) => {
      prev.resolve?.(false);
      return { ...prev, isOpen: false };
    });
  }, []);

  /** window.confirm() yerine kullanın — Promise<boolean> döner */
  const showConfirm = useCallback(
    (opts) => openModal({ type: "confirm", ...opts }),
    [openModal]
  );

  /** window.alert() yerine kullanın — sadece "Tamam" butonu */
  const showAlert = useCallback(
    (opts) => openModal({ type: opts.type || "alert", ...opts }),
    [openModal]
  );

  /** ConfirmModal bileşenine spread edilecek props */
  const modalProps = {
    isOpen: state.isOpen,
    type: state.type,
    title: state.title,
    message: state.message,
    confirmText: state.confirmText,
    cancelText: state.cancelText,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  };

  return { modalProps, showConfirm, showAlert };
};

export default useModal;
