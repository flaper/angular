# Flaper Core
Typescript package with Flaper services and models

## Install 
`npm install flaper`

## Example
```typescript
import {ApiService, AuthService} from 'flaper';
```

## To link with local flaper.web

We need to have exactly same packages, so remove local node_modules
```bash
rm node_modules
ln -s /web/flaper.admin/node_modules node_modules
```

Than use `npm link` command to join