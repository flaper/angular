# Flaper Angular Lib
Flaper services, models, pipes, etc

## Install 
`npm install @flaper/angular`

## Example
```typescript
import {UserService, StoryService} from '@flaper/angular';
```

## To link with local flaper.web

We need to have exactly same packages, so remove local node_modules
```bash
rm node_modules
ln -s /web/flaper.admin/node_modules node_modules
```

Than use `npm link` command to join