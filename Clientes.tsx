import './clientes.css'
import { ClientesPropsModel } from "../../models/clientes/clientes.model";
import Cliente from "./Cliente";
import useScreenSize from "../../hooks/useScreenSize";
import CustomDropdown from "../ui/CustomDropdown";
import ClientePagination from "./ClientePagination";
import { useTablaFiltro } from "../../hooks/useTablaFiltro";
import { useHeightTabla } from '../../hooks/useHeightTabla';
import ClienteHeader from './ClienteHeader';
import ClienteFiltrado from './ClienteFiltrado';
import MostrarFilas from './MostrarFilas';
import { useState } from 'react';

const Clientes = ({clientes}: {clientes: ClientesPropsModel[]}) => {
  const {width} = useScreenSize() 
  const name: keyof ClientesPropsModel = 'name'
  const {setItemShow, itemShow} = useTablaFiltro({data: clientes, name: name})
  const {clienteRef, botonRef, filtradoRef, theadRefs, tablaMedida} = useHeightTabla()
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  }
  const [valueSelect, setValueSelect] = useState<keyof ClientesPropsModel>('name')

  const filteredProducts = clientes.filter((cliente) => {
  return cliente[valueSelect]?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase());
  }

  );
  const indexOfLastItem = currentPage * itemShow;
  const indexOfFirstItem = indexOfLastItem - itemShow;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
     <div className="bg-white p-3 ">
    <ClienteHeader clienteRef={clienteRef}/>
    <div ref={filtradoRef} className="bg-gray-200 p-2 mb-2">
      
      <div className={ width > 992 ? "flex justify-between items-center  " : ' flex-column  '}>
        <div className={ width > 992 ?  "flex space-x-2 gap-3 " : ' flex space-x-2 gap-3 mb-2'}>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-300">
            Excel
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
            Print
          </button>
       <MostrarFilas setItemShow={setItemShow}/>
        </div>
        
     <ClienteFiltrado 
     search={searchTerm} 
     onSearch={onSearch} 
     setValueSelect={setValueSelect}/>
      </div>
    </div>
    <div className="overflow-x-auto">
      <div className="relative w-full ProductsOver" style={{ maxHeight: tablaMedida }}>
        <table className="w-full caption-bottom text-sm">
          <thead ref={theadRefs} className="[&_tr]:border-b bg-pos thead-sticky bg-pos">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
              <CustomDropdown title="Nombre"  />
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title="Email" />

              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title="Telefono" />

              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title="Estado" />

              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
              <CustomDropdown title="RFC" />
              </th>
              
      
              <th className="h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0 ">
            {currentItems.slice(0, itemShow).map((cliente) => (
            <Cliente key={cliente.id} {...cliente}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div  className="mt-1">
    <ClientePagination botonRef={botonRef} handlePageChange={handlePageChange} currentPage={currentPage} itemShow={itemShow}/>
    </div>
  </div>
    
    </>
  )
}

export default Clientes

