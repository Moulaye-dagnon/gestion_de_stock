import OverallComponent from "../../components/Overrall/OverallComponent";

export function Home() {
  return (
    <div className="flex-1 px-4 flex flex-col gap-y-2 overflow-auto   w-full">
      <OverallComponent title="Inventaire global" />
    </div>
  );
}
