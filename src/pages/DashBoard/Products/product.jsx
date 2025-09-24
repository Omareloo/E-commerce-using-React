import { useState } from "react";
import { Button } from "@mui/material";
import ProductTable from "../../../components/DashBoardComp/ProductTable.jsx/producttable";
import ProductFormModel from "../../../components/DashBoardComp/ProductFormModel/productformmodel";


export default function Products() {
  const [products, setProducts] = useState([
    {
      _id: 1,
      title: "iPhone 15 Pro",
      price: 1200,
      image: "https://example.com/iphone15.jpg",
      description: "Latest iPhone with titanium design and A17 Pro chip.",
      Catergory: { _id: "c1", name: "Electronics" },
      SubCatergory: { _id: "s1", name: "Mobiles" },
      slug: "iphone-15-pro",
    },
    {
      _id: 2,
      title: "Samsung Galaxy S24",
      price: 999,
      image: "https://example.com/galaxyS24.jpg",
      description: "Samsung flagship phone with AI-powered features.",
      Catergory: { _id: "c1", name: "Electronics" },
      SubCatergory: { _id: "s1", name: "Mobiles" },
      slug: "samsung-galaxy-s24",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const categories = [{ _id: "c1", name: "Electronics" }];
  const subCategories = [{ _id: "s1", name: "Mobiles" }];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (editing) {
      setProducts(products.map((p) => (p._id === editing._id ? { ...editing, ...data } : p)));
    } else {
      setProducts([...products, { _id: Date.now(), ...data }]);
    }

    setOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add Product
      </Button>

      <ProductTable
        products={products}
        onEdit={(p) => {
          setEditing(p);
          setOpen(true);
        }}
        onDelete={(id) => setProducts(products.filter((p) => p._id !== id))}
      />

      <ProductFormModel
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        categories={categories}
        subCategories={subCategories}
        initialData={editing}
      />
    </div>
  );
}
