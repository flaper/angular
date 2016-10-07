# Flaper Angular Lib [![npm version](https://badge.fury.io/js/%40flaper%2Fangular.svg)](https://badge.fury.io/js/%40flaper%2Fangular)
Flaper services, models, pipes, etc


## Development 
### To link with local flaper.web
```
npm install typescript@2.0 -g
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
