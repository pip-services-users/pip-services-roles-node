# Seneca Protocol (version 1) <br/> Roles Microservice

Roles microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        localhost: 'localhost', // Microservice localhost
        port: 8812, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'roles',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [cmd: 'get_roles'](#operation1)
* [cmd: 'set_roles'](#operation2)
* [cmd: 'grant_roles'](#operation3)
* [cmd: 'revoke_roles'](#operation4)
* [cmd: 'authorize'](#operation5)

## Operations

### <a name="operation1"></a> Cmd: 'get_roles'

Gets all roles granted to specified user.

**Arguments:** 
- user_id: string - unique user id

**Returns:**
- err: Error - occured error or null for success
- result: [string] - all roles granted to the user

### <a name="operation2"></a> Cmd: 'set_roles'

Sets all roles granted to specified user. 
This operation overrides all previously granted roles.

**Arguments:** 
- user_id: string - unique user id
- roles: [string] - all roles 

**Returns:**
- err: Error - occured error or null for success
- result: [string] - all roles granted to the user

### <a name="operation3"></a> Cmd: 'grant_roles'

Grant one or manu roles to the user. It doesn't affect other granted roles.

**Arguments:** 
- user_id: string - unique user id
- roles: [string] - roles granted to the user

**Returns:**
- err: Error - occured error or null for success
- result: [string] - all roles granted to the user

### <a name="operation4"></a> Cmd: 'revoke_roles'

Revokes one or many roles from the user. It doesn't affect other granted roles.

**Arguments:** 
- user_id: string - unique user id
- roles: [string] - roles to be revoked from the user

**Returns:**
- err: Error - occured error or null for success
- result: [string] - all roles granted to the user

### <a name="operation5"></a> Cmd: 'authorize'

Authorizes user by checking if he was granted all requested roles.

**Arguments:** 
- user_id: string - unique user id
- roles: [string] - requested roles to authorize

**Returns:**
- err: Error - occured error or null for success
- result: Object - A object since Seneca doesn't allow to pass simple types
  - authorized: boolean - **true** if user was authorized and **false** otherwise
