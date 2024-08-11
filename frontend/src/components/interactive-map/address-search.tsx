import {AddressSearchInput} from "./address-search-input.tsx";

const AddressSearch = () => {
    return (
        <div className="md:bg-primary py-12 md:py-20 flex md:bg-hippoHero bg-cover bg-center lg:bg-no-repeat lg:bg-right">
            <aside className=" w-full md:w-1/2 flex  justify-center">
                <div className="w-full md:w-[26rem]">
                   
                <AddressSearchInput/>
                </div>
            </aside>
        </div>

    )

};

export default AddressSearch;
