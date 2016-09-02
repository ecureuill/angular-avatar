
I'm upgrading this directive, created by [ajsoriar/angular-avatar](https://github.com/ajsoriar/angular-avatar), to angular2.
For now, the main function is working and generating the initials avatar (tested in a ionic project). 

To use it, just copy the ng-avatar.directive.ts file to your project, included it in your component and add the <ng-avatar> tag to your html.
<ng-avatar [initials]="user.initials"></ng-avatar>


| option               | default | description           |
| :------------------- | :----- | :--------------------- |
| `initials`           | null  | Letters that will be rendered inside the avatar. Commonly the initials of first name and last name or a username. One, two or three letters can be used. |
| `string`             | null  | Here you can put a group of words like a sentence or your complete name. The first letter of each word will be used to generate the avatar's image. |
| `width`              | 45    | An integer that sets the avatar's width and height in pixels using styles. Height of the avatar will be taken from it's width attribute. height attribute doesn't exist. |
| `bg-color`           | #000  | This is the background color of the avatar. If not set, the background will be black. You can use regular css color's like color names, hex or rgb. |
| `text-color`         | #fff  | The color of the letters. Letters will be white if this attribute is not set. Use regular css colors. |
| `round-shape`        | false | When set to `true` the avatar will take a round shape. By default the avatar will have a square shape. |
| `corner-radius`      | 0     | Square avatars can have rounded corners using this property. |
| `picture-resolution` | 256   | This attribute sets the real resolution (width and height in pixels) of the picture that this directive generates. `width` attribute will scale the picture using only styles. | 
| `pixelated`          | false | If ng-avatar's `width` is bigger than `picture-resolution` attribute, the web browser will scale the image and we will get a blurry picture. This attribute deactivates the anti-aliasing effect and you will get a pixelated image. Useful If you want a retro styling. |
| `wrapper`            | true  | ng-avatar generates an img tag and a div layer that wraps the image. A boolean false value removes the div that wraps the avatar's image. This wrapping div has an special class `class="avatar-wrapper"` that can be used to apply extra styling. ng-avatar uses this div to generate a round avatar applying extra styles when round-shape attribute is true, `round-shape="true"` |
| `class`              | null  | Use this attribute in the same way it is used in common html tags. |
| `style`              | null  | Use this attribute in the same way it is used in common html tags. |
| `picture-format`     | png   | Set `picture-format="jpeg"` and the avatar will be rendered as a jpeg. If not set, png format will be used by default. |
| `auto-color`         | false | By default the generated picture will have a black background if no color is assigned. Setting `auto-color="true"` will automatically assign a color to the avatar's background depending on the combination of characters used. |
| `text-shadow`     | false   | This paints an elegant thin shadow around the edges of each letter. |


Above, info from original source (angular1).

==================================== 


# angular-avatar

Angular Avatar is a simple and lightweight AngularJS2 directive that generates a letter's avatar like Microsoft or Google do in their web apps. First letter of each word in a string or a group of initials will be used to generate the avatar. The image of the avatar will be rendered in an html img tag as a real png or jpeg. The image data can be retrieved using javascript to be stored in back-end giving you an initial profile picture in your web or mobile apps when the user does not upload one. Several angular atributes are available to configure the output: size, shape, resolution, colors, etc.

![angular-avatar auto-color feature examples](./demo/angular-avatar-autocolor-example.png?raw=true "angular-avatar auto-color feature examples")

This example in plunker: https://plnkr.co/edit/bhnvU3?p=preview

## Quick start. 

#### 1 Download and Install angular-avatar:

 - Bower: **bower install angular-avatar**
 - NPM: **npm install angular-avatar**
 - NuGet: **PM> Install-Package angular-avatar**
 - github: **https://github.com/ajsoriar/angular-avatar**

#### 2 Include dependences: 
2.1 angular-avatar.js or angular-avatar.min.js are under dist folder.

2.2 Include angular-avatar.js or angular-avatar.min.js after angular dependences, e.g.
```javascript
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="bower_components/angular-avatar/dist/angular-avatar.js"></script>
```

2.3 Add ngAvatar module as a dependency when creating your app, e.g.

```javascript
var app = angular.module('myApp', ['ngAvatar']);
```

#### 3 Use it. 
No need to inject in controllers just use it in your html code this way:
```javascript
<ng-avatar initials="A"></ng-avatar>
```
You will get this:
![angular-avatar basic usage example](./demo/angular-avatar-basic-example.png?raw=true "angular-avatar basic usage example")

This code will be generated by the directive:
```javascript
<div class="avatar-wrapper " style="border-radius: 0;display: block;overflow: hidden;width: 45px;height: 45px;">
	<img src="data:image/png;base64,iVBORw0KGgo..." class="avatar-picture" style="vertical-align: top;" height="" width="100%">
</div>
```

More usage examples ready to copy and paste: :+1:
```javascript
<ng-avatar initials="A"></ng-avatar>
<div ng-avatar initials="AS" bg-color="#00FF00"></div>
<ng-avatar initials="AJS" bg-color="cyan" text-color="blue" round-shape="true" ></ng-avatar>
<div ng-avatar initials="AJ" bg-color="red" text-color="yellow" picture-resolution="512" width="64"></div>
<div ng-avatar initials="AJ" bg-color="yellow" text-color="green" picture-resolution="1024" width="32"></div>
<ng-avatar initials="AS" bg-color="lightgreen" text-color="red" picture-resolution="16" width="128" pixelated="false" ></ng-avatar>
<ng-avatar initials="AS" bg-color="#99f499" text-color="red" picture-resolution="16" width="128" pixelated="true" ></ng-avatar>
<ng-avatar initials="AS" round-shape="true" bg-color="#a8ff2c" text-color="black" picture-resolution="512" width="42" pixelated="false" class="adres-css" style="border:4px solid red" ></ng-avatar>
<ng-avatar initials="AS" round-shape="true" string="  andres     jose   soria " bg-color="orange" text-color="#FFF" picture-resolution="256" width="64" pixelated="false" class="adres-css" style="border:4px solid red" ></ng-avatar>
<ng-avatar round-shape="true" bg-color="#36adf2" text-color="white" picture-resolution="256" width="56" pixelated="false" class="adres-css" style="border:2px solid blue" ></ng-avatar>
<ng-avatar initials="CM" corner-radius="7" bg-color="#3875d7"></ng-avatar>
<div ng-avatar initials="jpg" picture-format="jpeg" bg-color="red" text-color="yellow" width="64" corner-radius="5" ></div>
<div ng-avatar initials="png" picture-format="png" bg-color="purple" text-color="yellow" width="64" corner-radius="5" ></div>
```
You will get this:

![More angular-avatar basic usage examples](./demo/angular-avatar-examples.png?raw=true "More angular-avatar basic usage examples")

Run the live example in plunker: http://plnkr.co/edit/TfCxUn?p=preview

#### 4 Attributes

| option               | default | description           |
| :------------------- | :----- | :--------------------- |
| `initials`           | null  | Letters that will be rendered inside the avatar. Commonly the initials of first name and last name or a username. One, two or three letters can be used. |
| `string`             | null  | Here you can put a group of words like a sentence or your complete name. The first letter of each word will be used to generate the avatar's image. |
| `width`              | 45    | An integer that sets the avatar's width and height in pixels using styles. Height of the avatar will be taken from it's width attribute. height attribute doesn't exist. |
| `bg-color`           | #000  | This is the background color of the avatar. If not set, the background will be black. You can use regular css color's like color names, hex or rgb. |
| `text-color`         | #fff  | The color of the letters. Letters will be white if this attribute is not set. Use regular css colors. |
| `round-shape`        | false | When set to `true` the avatar will take a round shape. By default the avatar will have a square shape. |
| `corner-radius`      | 0     | Square avatars can have rounded corners using this property. |
| `picture-resolution` | 256   | This attribute sets the real resolution (width and height in pixels) of the picture that this directive generates. `width` attribute will scale the picture using only styles. | 
| `pixelated`          | false | If ng-avatar's `width` is bigger than `picture-resolution` attribute, the web browser will scale the image and we will get a blurry picture. This attribute deactivates the anti-aliasing effect and you will get a pixelated image. Useful If you want a retro styling. |
| `wrapper`            | true  | ng-avatar generates an img tag and a div layer that wraps the image. A boolean false value removes the div that wraps the avatar's image. This wrapping div has an special class `class="avatar-wrapper"` that can be used to apply extra styling. ng-avatar uses this div to generate a round avatar applying extra styles when round-shape attribute is true, `round-shape="true"` |
| `class`              | null  | Use this attribute in the same way it is used in common html tags. |
| `style`              | null  | Use this attribute in the same way it is used in common html tags. |
| `picture-format`     | png   | Set `picture-format="jpeg"` and the avatar will be rendered as a jpeg. If not set, png format will be used by default. |
| `auto-color`         | false | By default the generated picture will have a black background if no color is assigned. Setting `auto-color="true"` will automatically assign a color to the avatar's background depending on the combination of characters used. |
| `text-shadow`     | false   | This paints an elegant thin shadow around the edges of each letter. |

#### 4 License

MIT

Copyright (c) 2016 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**Free Software, Yeah!**
