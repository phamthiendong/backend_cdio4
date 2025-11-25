import express from "express";
const router = express.Router();

const posts = [
  { id: 1, title: "Cách chăm sóc sức khỏe mùa lạnh", author: "BS. Nguyễn Văn A" },
  { id: 2, title: "Dinh dưỡng cho trẻ em", author: "BS. Trần Thị B" },
];

router.get("/", (req, res) => res.json(posts));

export default router;
