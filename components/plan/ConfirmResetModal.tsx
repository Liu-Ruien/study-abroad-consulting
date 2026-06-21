"use client";

type ConfirmResetModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmResetModal({
  onCancel,
  onConfirm,
}: ConfirmResetModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[86vh] w-full max-w-md flex-col overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
        <div className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.08)_0%,rgba(224,242,254,0.24)_34%,transparent_62%),linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(248,250,252,0.92)_100%)] px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl sm:px-6">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            确认重置？
          </h3>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
          <p className="text-sm leading-7 text-slate-600">
            这会清空已填写信息和当前路线结果。
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200/70 transition hover:bg-slate-200/70"
          >
            取消
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            确认重置
          </button>
        </div>
      </div>
    </div>
  );
}
