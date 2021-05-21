import { IsEqual, Listify } from "../utilities/helper-types";
import { defaultEntity, Entities } from "./entities";
import { Queryable, QueryFunction, queryable } from "./queryable";

interface FormBuilder {
    readonly specification: Listify<Partial<Entities>>,//Partial<Entities>,
    entity: <EntityType extends Entities[EQ], EQ extends keyof Entities>(entity: EQ, 
        q: QueryFunction<Entities[EQ], {}, Partial<Entities[EQ]>, Partial<Entities[EQ]> >) =>
        FormBuilder
}

// FormBuilder constructor
export const FormBuilder = function() : FormBuilder {
    return {
        specification: {} as Listify<Partial<Entities>>,

        entity: function(entity, q) {
            if(this.specification[entity] == undefined)
                this.specification[entity] = [q(queryable(defaultEntity(entity))).querried]
            else
                this.specification[entity].push(q(queryable(defaultEntity(entity))).querried);
             
            return this;
        },
        
    }
}()


