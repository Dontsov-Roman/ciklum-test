import constants from "./constants";
import Factory from "../../../redux/actions/factory";
import repo, { IParagraph } from "../repo";

export default Factory<IParagraph>(constants, repo);