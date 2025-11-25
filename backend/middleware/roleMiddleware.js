export const requireAdmin=(req,res,next)=>{if(!req.user||req.user.role!=='admin')return res.status(403).json({error:'Forbidden'});next();};
export const isDoctor = (req, res, next) => {
  if (req.user?.role !== "doctor") return res.status(403).json({ message: "Chỉ bác sĩ" });
  next();
};
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Chỉ admin" });
  next();
};
