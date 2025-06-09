import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography } from "antd";

interface Ingredient {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [loading, setLoading] = useState(false);

  const { Title } = Typography;

  const fetchRandomIngredients = async (ingredient: string): Promise<any[]> => {
    try {
      setLoading(true);
      const fetchIngredients = async () => {
        try {
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`,
          );
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          return data?.drinks;
        } catch (error: any) {
          console.error("Fetch failed:", error);
          return null;
        }
      };
      const ingredients = await fetchIngredients();
      setLoading(false);
      return ingredients;
    } catch (error: any) {
      setLoading(false);
      console.error("Fetch failed:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const ingredients = await fetchRandomIngredients(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`,
        );
        setIngredients(ingredients);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
        setIngredients([]);
      }
    };

    getIngredients();
  }, []);

  return (
    <div>
      <div style={{ color: "white" }}>Gin</div>
      <Row
        gutter={[24, 24]}
        style={{ marginTop: "10rem", overflowX: "hidden" }}
        justify="center"
      >
        {ingredients?.slice(0, 15).map((ingredient) => (
          <Col key={ingredient.idDrink} xs={12} sm={6} md={4} lg={3}>
            <Card
              loading={loading}
              cover={
                <img
                  alt={ingredient.strDrinkThumb}
                  src={ingredient.strDrinkThumb}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              }
              style={{
                boxShadow: "0 4px 16px rgba(211, 211, 211, 0.6)",
                backgroundColor: "#f8f8f8",
              }}
            >
              <Title level={4} style={{ marginBottom: 12 }}>
                {ingredient.strDrink}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Ingredients;
