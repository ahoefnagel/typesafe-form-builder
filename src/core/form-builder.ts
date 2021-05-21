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
            const w1 = q(queryable(defaultEntity(entity)));
            const w2 = queryable(defaultEntity(entity));
            const w3 = defaultEntity(entity);

            //TODO: if list empty, create new list with single item, else add querried to list
            this.specification[entity] = [q(queryable(defaultEntity(entity))).querried];
            return this;
        },
        
    }
}()


