import React from "react";
import { Header } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";

interface CocktailsHeaderProps {
  onHandleSearch: (searchValue: string) => void;
}

const CocktailsHeader = (props: CocktailsHeaderProps) => {
  const { onHandleSearch } = props;

  return (
    <Header
      style={{
        background: "",
        padding: "0 24px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "20px", cursor: "pointer" }}>
          Cocktails{" "}
          <span style={{ marginLeft: "20px", cursor: "pointer" }}>
            Ingredients
          </span>
        </div>
        <Search
          placeholder="Search by name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onHandleSearch}
          style={{ maxWidth: 400 }}
        />
      </div>
    </Header>
  );
};
export default CocktailsHeader;
