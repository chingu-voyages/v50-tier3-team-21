import {AppMap} from "../../components/interactive-map/map.tsx";
import AddressSearch from "../../components/interactive-map/address-search.tsx";
import {AddressSearchProvider} from "../../components/interactive-map/address-search-provider.tsx";
import {AppMapProvider} from "../../provider/map.provider.tsx";
import {FilterSection} from "../../components/interactive-map/filter.tsx";
import {MapProvider} from "react-map-gl";


export const HomePage = () => {
  return(
      <div className="w-full">
          <section className="px-4 md:px-0">
              <MapProvider>
                  <AddressSearchProvider >
                          <AddressSearch />
                          <AppMapProvider >
                              <FilterSection />
                              <div className="md:p-12 h-[100vh] md:h-[600px]">
                                  <AppMap />
                              </div>
                          </AppMapProvider>
                  </AddressSearchProvider>
              </MapProvider>
          </section>
      </div>
  )
}
