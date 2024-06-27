//import '' ('dotenv').config();
import express from 'express';
import cors from 'cors';
import { pool } from './src/db/connect.js';
import { dbConnection }  from './src/db/config.js';
import rubrosRoutes from "./src/routes/rubros.routes.js";
import reclamosRoutes from "./src/routes/reclamos.routes.js";
import reclamosInspectorRoutes from "./src/routes/reclamosInspector.routes.js";
import denunciasRoutes from "./src/routes/denuncias.routes.js";
import sitiosRoutes from "./src/routes/sitios.routes.js";
import desperfectosRoutes from "./src/routes/desperfectos.routes.js";
import promocionesRoutes from "./src/routes/promociones.routes.js";
import usuarioRoutes from './src/routes/usuarios.routes.js';
import personalRoutes from './src/routes/personal.routes.js';
import reclamosMultimediaRoutes from './src/routes/reclamosmultimedia.routes.js';
import denunciasMultimediaRoutes from "./src/routes/denunciasmultimedia.routes.js"

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.options('*', cors());
dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "You are connected to the project" });
});

app.get("/ping", async (req , res) => {
  const [result] = await pool.query('SELECT "Pong" AS result');
  res.json(result[0])
})

app.use("/api/desperfectos", desperfectosRoutes);
app.use("/api/sitios",sitiosRoutes);
app.use("/api/rubros",rubrosRoutes);
app.use("/api/reclamos",reclamosRoutes);
app.use("/api/reclamosInspector",reclamosInspectorRoutes);
app.use("/api/promociones",promocionesRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/personal", personalRoutes);
app.use("/api/reclamosmultimedia", reclamosMultimediaRoutes);
app.use("/api/denunciasmultimedia", denunciasMultimediaRoutes);
app.use("/api/denuncias", denunciasRoutes);

//mysqld --initialize -console
//mysql -u root -p

app.listen(port, () =>{
  console.log(`server running on port ${port}`);
})

