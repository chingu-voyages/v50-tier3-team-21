import {AppMap} from "../../components/interactive-map/map.tsx";
import AddressSearch from "../../components/interactive-map/address-search.tsx";
import {AddressSearchProvider} from "../../components/interactive-map/address-search-provider.tsx";
import {AppMapProvider} from "../../provider/map.provider.tsx";
import {MapProvider} from "react-map-gl";
import Modal from "../../components/ui/modal.tsx";
import React from "react";
import {FilterSection} from "../../components/interactive-map/filter.tsx";


export const HomePage = () => {
  return(
      <div className="w-full">
          <section className="px-4 md:px-0">
              <MapProvider>
                  <AddressSearchProvider >
                          <AddressSearch />
                          <FilterSection />
                          <AppMapProvider >
                              <div className="md:p-12 h-[100vh] md:h-[800px]">
                                  <AppMap />
                              </div>
                              <Modal>
                                  <p>I am a modal</p>
                              </Modal>
                          </AppMapProvider>
                  </AddressSearchProvider>

              </MapProvider>
          </section>
      </div>
  )
}
