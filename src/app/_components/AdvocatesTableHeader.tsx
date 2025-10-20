import { FC, useState } from "react";

interface Props {
  onSearchChange(searchTerm: string): void;
  onSearchReset(): void;
}

export const AdvocatesTableHeader: FC<Props> = ({
  onSearchChange,
  onSearchReset,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term"></span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <button onClick={onSearchReset}>Reset Search</button>
    </div>
  );
};
