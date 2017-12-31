import {creator} from "./creator/creator.module.js";
import {editor} from "./editor/editor.module.js";
import {utilities} from "../util/util.module.js";
import { listor } from '../track/listor/listor.module.js';
import { api } from '../api-interface/api.module.js';

export const createModule = angular
    .module('createModule', [
        api,
        listor,
        creator,
        editor,
        utilities,
    ])
    .name;