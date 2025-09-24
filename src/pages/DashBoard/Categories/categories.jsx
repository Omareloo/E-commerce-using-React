import { useState } from "react";
import { Button } from "@mui/material";
import CategoryTable from "../../../components/DashBoardComp/CategoriesTable.jsx/categoriestable.jsx";
import CategoryFormModal from "../../../components/DashBoardComp/CategoriesFormModel/categoriesformmodel.jsx";

export default function Categories() {
  const [categories, setCategories] = useState([
    { _id: "c1", name: "Electronics", slug: "electronics" },
    { _id: "c2", name: "Clothes", slug: "clothes" },
    { _id: "c3", name: "Books", slug: "books" },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (editing) {
      setCategories(categories.map((c) => (c._id === editing._id ? { ...editing, ...data } : c)));
    } else {
      setCategories([...categories, { _id: Date.now().toString(), ...data }]);
    }

    setOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add Category
      </Button>

      <CategoryTable
        categories={categories}
        onEdit={(c) => {
          setEditing(c);
          setOpen(true);
        }}
        onDelete={(id) => setCategories(categories.filter((c) => c._id !== id))}
      />

      <CategoryFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initialData={editing}
      />
    </div>
  );
}
