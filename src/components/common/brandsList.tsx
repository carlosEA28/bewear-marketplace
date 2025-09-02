import BrandItemComponent from "./brand-item";

const BrandListComponent = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold px-5">Marcas Parceiras</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <BrandItemComponent />
      </div>
    </div>
  );
};

export default BrandListComponent;
