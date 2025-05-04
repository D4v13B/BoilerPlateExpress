import { Router } from "express"
import authRoutes from "./auth.routes"
import usuarioRoutes from "./user.routes"
import roleRoutes from "./role.routes"


const router = Router()

router.use("/auth", authRoutes)
router.use("/usuario", usuarioRoutes)
router.use("/roles", roleRoutes)

export default router