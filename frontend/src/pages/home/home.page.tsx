import {AppMap} from "../../components/interactive-map/map.tsx";
import AddressSearch from "../../components/interactive-map/address-search.tsx";
import {AddressSearchProvider} from "../../components/interactive-map/address-search-provider.tsx";


export const HomePage = () => {
  return(
      <div className="w-full">
          <section className="px-6 md:px-0">
              <AddressSearchProvider >
                  <AddressSearch />
                  <AppMap />
              </AddressSearchProvider>
          </section>
      </div>
  )
}
