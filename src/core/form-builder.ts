import { IsEqual } from "../utilities/helper-types";
import { defaultEntity, Entities } from "./entities";
import { Queryable, queryable } from "./queryable";

interface FormBuilder {
    entity: <EntityType extends Entities[EQ], EQ extends keyof Entities>(entity: EQ) 
        => Queryable<Entities[EQ], {}>; //Queryable<ObjectType, {}>;
    // entity: <EntityType extends keyof Entities>(entity: EntityType) => 
    //     Queryable<EntityType, {}>; //Queryable<ObjectType, {}>;

    
}

// FormBuilder constructor
const formBuilder = function() : FormBuilder {
    return {
        entity: <EntityType extends Entities[EQ], EQ extends keyof Entities>(entity: EQ) => {
            return queryable(defaultEntity<EQ>(entity));
        // entity: <EntityType extends Entities>(entity: keyof EntityType) => {
        //     return queryable(defaultEntity<EntityType>(entity));

        },
    }
}()

var fb = formBuilder.entity<Entities["Student"], "Student">("Student").select("surname", "name");
var ab = fb.select()

