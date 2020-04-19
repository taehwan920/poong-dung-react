import app from "./app";
import schedulerInit from "./scheduler";
import { environment } from "./environment";

schedulerInit();

const PORT = environment.DB_PORT || 8080;
const handleListen = () => console.log(`Listening on http://localhost:${PORT}/db`);

app.listen(PORT, handleListen);