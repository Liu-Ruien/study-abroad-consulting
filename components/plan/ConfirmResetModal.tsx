"use client";

import { btnPrimary, btnSecondary, modalFooter, modalHeader, modalShell } from "@/lib/ui/card-system";
import { usePageContent } from "@/lib/i18n/use-page-content";

type ConfirmResetModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmResetModal({
  onCancel,
  onConfirm,
}: ConfirmResetModalProps) {
  const copy = usePageContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <div className={`flex max-h-[86vh] w-full max-w-md flex-col ${modalShell}`}>
        <div className={modalHeader}>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            {copy.plan.modal.resetTitle}
          </h3>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
          <p className="text-sm leading-7 text-slate-600">
            {copy.plan.modal.resetBody}
          </p>
        </div>

        <div
          className={`flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ${modalFooter}`}
        >
          <button
            type="button"
            onClick={onCancel}
            className={`rounded-full px-5 py-2.5 text-sm font-medium ${btnSecondary}`}
          >
            {copy.plan.modal.cancel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full px-5 py-2.5 text-sm font-medium ${btnPrimary}`}
          >
            {copy.plan.modal.confirmReset}
          </button>
        </div>
      </div>
    </div>
  );
}
