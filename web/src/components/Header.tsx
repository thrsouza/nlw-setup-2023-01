import { Plus } from "phosphor-react";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img src="./assets/logo.svg" alt="Habits" />
        <button
          type="button"
          className="flex items-center gap-3 border border-violet-500 rounded-lg font-semibold px-6 py-4 hover:border-violet-300"
        >
          <Plus size={20} className="text-violet-500" />
          Novo Hábito
        </button>
      </div>
    </div>
  );
}
