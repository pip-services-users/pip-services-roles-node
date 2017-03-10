# HTTP REST Protocol (version 1) <br/> Roles Microservice

Roles microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [GET /roles/:user_id](#operation1)
* [POST /roles/:user_id](#operation2)
* [PUT /roles/:user_id](#operation3)
* [DELETE /roles/:user_id](#operation4)
* [GET /roles/:user_id/authorize](#operation5)

## Operations

### <a name="operation1"></a> Method: 'GET', route '/roles/:user_id'

Gets all roles granted to specified user.

**Parameters:** 
- user_id: string - unique user id

**Response body:**
- roles: [string] - all roles granted to the user
- or error

### <a name="operation2"></a> Method: 'PUT', route '/roles/:party_id'

Sets all roles granted to specified user. 
This operation overrides all previously granted roles.

**Parameters:** 
- user_id: string - unique user id

**Request body:**
- roles: [string] - all roles 

**Response body:**
- roles: [string] - all roles granted to the user
- or error

### <a name="operation3"></a> Method: 'PUT', route '/roles/:user_id'

Grant one or manu roles to the user. It doesn't affect other granted roles.

**Parameters:** 
- user_id: string - unique user id
- role: string - (optional) a role to be granted
- roles: [string] - (optional) a comma-separated list of roles to be granted

**Response body:**
- roles: [string] - all roles granted to the user
- or error

### <a name="operation4"></a> Method: 'DELETE', route '/roles/:user_id'

Revokes one or many roles from the user. It doesn't affect other granted roles.

**Parameters:** 
- user_id: string - unique user id
- role: string - (optional) a role to be revoked
- roles: [string] - (optional) a comma-separated list of roles to be revoked

**Response body:**
- roles: [string] - all roles granted to the user
- or error

### <a name="operation5"></a> Method: 'GET', route '/roles/:user_id/authorize'

Authorizes user by checking if he was granted all requested roles.

**Parameters:** 
- user_id: string - unique user id

**Response body:**
- roles: [string] - all roles granted to the user
- or error
