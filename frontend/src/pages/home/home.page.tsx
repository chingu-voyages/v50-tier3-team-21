import {AppMap} from "../../components/interactive-map/map.tsx";
import AddressSearch from "../../components/interactive-map/address-search.tsx";
import {AddressSearchProvider} from "../../components/interactive-map/address-search-provider.tsx";
import {AppMapProvider} from "../../provider/map.provider.tsx";
import {MapProvider} from "react-map-gl";
import Modal from "../../components/ui/modal.tsx";
import {FilterSection} from "../../components/interactive-map/filter.tsx";
import {FilterForm} from "../../components/interactive-map/filter-form.tsx";


export const HomePage = () => {
  return(
      <div className="w-full">
          <section className="px-4 md:px-0">
              <MapProvider>
                  <AddressSearchProvider >
                          <AddressSearch />
                          <AppMapProvider >
                              <FilterSection />
                              <div className="w-full md:p-12  h-[500px] md:h-[800px] relative">
                                  <AppMap />
                                  <Modal>
                                      <FilterForm />
                                  </Modal>
                              </div>
                          </AppMapProvider>
                  </AddressSearchProvider>

              </MapProvider>
          </section>
      </div>
  )
}
