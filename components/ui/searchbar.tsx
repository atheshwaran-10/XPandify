import { Input } from "./input"

export function SearchBar() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]  "
      />
    </div>
  )
}