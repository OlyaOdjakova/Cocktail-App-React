import React from "react";
import { Header } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import { CocktailsHeaderProps } from "../cocktails.types";

const CocktailsHeader = (props: CocktailsHeaderProps) => {
  const { selectedIngredients, onHandleSearch, onHandleIngredients } = props;

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
        <div
          style={{
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              cursor: "pointer",
              gap: "2rem",
            }}
            onClick={() => onHandleIngredients(false)}
          >
            Cocktails
          </div>
          <div
            style={{ marginLeft: "20px", cursor: "pointer" }}
            onClick={() => onHandleIngredients(true)}
          >
            Ingredients
          </div>
        </div>

        {!selectedIngredients && (
          <Search
            placeholder="Search by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onHandleSearch}
            style={{ maxWidth: 400 }}
          />
        )}
      </div>
    </Header>
  );
};
export default CocktailsHeader;
