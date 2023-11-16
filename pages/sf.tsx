import Header from "@/components/Header";
import UsersModal from "@/components/layout/UsersModal";
const SearchComponent = () => {
  return ( 
    <>
      <Header label="Search" />
      <div>
        <UsersModal/>
      </div>
    </>
   );
}
 
export default SearchComponent;