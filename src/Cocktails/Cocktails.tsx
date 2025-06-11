import React, { useEffect, useState } from "react";
import { Card, Typography, List, Col, Row, Spin, Divider, Button } from "antd";
import { Layout } from "antd";
import { Cocktail } from "./cocktails.types";
import { getIngredientsWithMeasures } from "./cocktails.utils";
import CocktailsHeader from "./CocktailsHeader/CocktailsHeader";
import { fetchCocktails } from "./cocktails.api";
import Ingredients from "./Ingredients/Ingredients";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Cocktails = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSelectedIngredients, setSelectedIngredients] = useState(false);

  const onHandleIngredients = (ingredientsValue: boolean) => {
    setSelectedIngredients(ingredientsValue);
  };

  const handleSearch = async (searchValue: string) => {
    const searchTerm = searchValue.trim().toLowerCase();
    const filtered = cocktails.filter((cocktail) =>
      cocktail.strDrink.toLowerCase().includes(searchTerm),
    );
    setCocktails(filtered);
  };

  const fetchRandomCocktails = async () => {
    try {
      setLoading(true);
      const cocktails = await fetchCocktails();
      if (cocktails.length !== 0) {
        setCocktails(cocktails);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Fetch failed:", error.message);
    }
  };

  useEffect(() => {
    const getCocktails = async () => {
      const cocktails = await fetchCocktails();
      setCocktails(cocktails);
    };

    getCocktails();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      <CocktailsHeader
        isSelectedIngredients={isSelectedIngredients}
        onHandleSearch={handleSearch}
        onHandleIngredients={onHandleIngredients}
      />

      <Content
        style={{
          padding: "24px",
          background: "white",
          minHeight: "100vh",
          backgroundColor: "#001529",
        }}
      >
        {!isSelectedIngredients && (
          <Row
            justify="center"
            style={{
              padding: "40px 0 10px",
              marginBottom: "4rem",
              textAlign: "center",
            }}
          >
            <div>
              <Title
                level={2}
                style={{
                  letterSpacing: "5px",
                  marginTop: "5rem",
                  marginBottom: "8px",
                  color: "white",
                }}
              >
                COCKTAIL RECIPES
              </Title>
              <Divider
                style={{
                  backgroundColor: "#e6007e",
                  height: "4px",
                  margin: "0 auto",
                  width: "20px",
                }}
              />
            </div>
          </Row>
        )}

        {isSelectedIngredients && (
          <Ingredients isSelectedIngredients={isSelectedIngredients} />
        )}

        {!isSelectedIngredients && (
          <Row gutter={[16, 16]} justify="center" style={{ gap: "2rem" }}>
            {loading ? (
              <Spin
                size="large"
                style={{ transform: "scale(2)", margin: "50px 0" }}
              />
            ) : cocktails.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 50,
                  fontSize: 18,
                  color: "white",
                }}
              >
                No cocktails found.
              </div>
            ) : (
              !isSelectedIngredients &&
              cocktails.map((cocktail) => (
                <Col key={cocktail.idDrink} xs={22} sm={12} md={8} lg={5}>
                  <Card
                    loading={loading}
                    cover={
                      <img
                        alt={cocktail.strDrink}
                        src={cocktail.strDrinkThumb}
                      />
                    }
                    style={{
                      boxShadow: "0 4px 16px rgba(211, 211, 211, 0.6)",
                      backgroundColor: "#f8f8f8",
                    }}
                  >
                    <Title level={4} style={{ marginBottom: 12 }}>
                      {cocktail.strDrink}
                    </Title>

                    <List
                      size="small"
                      header={<strong>Measures:</strong>}
                      dataSource={getIngredientsWithMeasures(cocktail)}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                    <Paragraph style={{ fontSize: "0.9rem" }}>
                      <strong>How to make:</strong> {cocktail.strInstructions}
                    </Paragraph>

                    <Paragraph style={{ fontSize: "0.9rem" }}>
                      <strong>Glass type:</strong> {cocktail.strGlass}
                    </Paragraph>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}

        {!isSelectedIngredients && (
          <Row
            justify="center"
            style={{
              padding: "40px 0 10px",
              marginBottom: "4rem",
              textAlign: "center",
            }}
          >
            <Button type="primary" onClick={fetchRandomCocktails} size="large">
              🍹 LOAD NEW COCKTAILS
            </Button>
          </Row>
        )}
      </Content>
    </div>
  );
};

export default Cocktails;
