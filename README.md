# Flaper Angular Lib
Flaper services, models, pipes, etc


## Development 
### To link with local flaper.web
```
npm install typescript -g
```

We need to have exactly same packages, so remove local node_modules
```bash
rm node_modules
ln -s /web/flaper.admin/node_modules node_modules
```

To compile use `tsc`
Than use `npm link` command to join



## Usage 

## Install 
`npm install @flaper/angular`

## Example
```typescript
import {UserService, StoryService} from '@flaper/angular';
```
