import { Directive,
			Component,
			ComponentFactory,
			ComponentMetadata,
			ComponentResolver,
			Input,
			ReflectiveInjector,
			ViewContainerRef} from '@angular/core';

export function createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent { };
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Directive({
	selector: '[ng-avatar]'
})

export class NgAvatar {

	/* input properties */
		@Input("initials") set inicial(initials: string) {
			if (initials != null)
				this._string = initials;
		}
		@Input("string") set str(str: string) {
			if (str != null)
				this._string = this.getInitialsFromString(str);
		}

		@Input("width") set long(long: number) {
			if (long != null)
				this._long = this.long;
		}

		@Input("pictureResolution") set picture_resolution(picture_resolution: number) {
			if (picture_resolution != null)
				this._picture_resolution = picture_resolution;
		}


		@Input("class") set extra_classes(extra_classes: string) {
			if (extra_classes != null)
				this._extra_classes = extra_classes;
		}

		@Input("img_styling") set img_styling(img_styling: string) {
			if (img_styling != null)
				this._img_styling = img_styling;
		}
		@Input("wrapper_styling") set wrapper_styling(wrapper_styling: string) {
			if (wrapper_styling != null)
				this._wrapper_styling = wrapper_styling;
		}
		@Input("style") set extra_styles(extra_styles: string) {
			if (extra_styles != null)
				this._extra_styles = extra_styles;
		}
		@Input("cornerRadius") set corner_radius(corner_radius: string) {
			if (corner_radius != null)
				this._corner_radius = corner_radius;
		}

		@Input("pictureFormat") set picture_format(picture_format: string) {
			if (picture_format != null && (picture_format == "jpeg" || picture_format == "jpg"))
				this._picture_format = "jpeg";
		}

		@Input("bgcolor") set bgcolor(bgcolor: string) {
			if (bgcolor != null)
				this._bgcolor = bgcolor;
		}
		@Input("textcolor") set textcolor(textcolor: string) {
			if (textcolor != null)
				this._textcolor = textcolor;
		}
		@Input("colorsPalette") set colors_palette(colors_palette: string[]) {
			if (colors_palette != null)
				this._colors_palette = colors_palette;
		}
		@Input("fontWeight") set font_weight(font_weight: number) {
			if (font_weight != null)
				this._font_weight = font_weight;
		}
		@Input("fontScale") set font_scale(font_scale: number) {
			if (font_scale != null)
				this._font_scale = font_scale;
		}

		@Input("roundShape") set roundShape(roundShape: boolean) {
			if (roundShape != null)
				this._roundShape = roundShape;
		}
		@Input("wrapper") set wrapper(wrapper: boolean) {
			if (wrapper != null)
				this._wrapper = wrapper;
		}
		@Input("pixelated") set pixelated(pixelated: boolean) {
			if (pixelated != null)
				this._pixelated = pixelated;
		}
		@Input("autoColor") set autoColor(autoColor: boolean) {
			if (autoColor != null)
				this._autoColor = autoColor;
		}
		@Input("textShadow") set text_shadow(text_shadow: boolean) {
			if (text_shadow != null)
				this._text_shadow = text_shadow;
		}

	constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) { }

	ngOnChanges() {
		const metadata = new ComponentMetadata({
			selector: 'avatar-picture',
			template: (this._wrapper ? '<div class="' + this.getWrapperClass() + '" style="' + this.getWrraperStyle() + '">' : "") +
			'<img src="' + this.getImgData() + '" class="avatar-picture" style="' + this.getImgStyle() + '" />' +
			(this._wrapper ? '</div>' : '')
		});

		createComponentFactory(this.resolver, metadata)
			.then(factory => {
				const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
				this.vcRef.createComponent(factory, 0, injector, []);
			});
	}

	getImgData(): string {
		return this.generateAvatar(this._string, this._picture_resolution, this._picture_resolution, this.getBgColor(), this._textcolor, null)
	}

	getWrapperClass(): string {
		return "avatar-wrapper " + this._extra_classes;
	}
	getWrraperStyle(): string {
		return this._wrapper_styling + "border-radius: " + (this._roundShape ? this._long : this._corner_radius) + "px;"
			+ "width:" + this._long + "px;height:" + this._long + "px;" + this._extra_styles;

	}

	getImgStyle(): string {
		return this._img_styling + (this._pixelated ? "image-rendering:pixelated; image-rendering:-moz-crisp-edges;" : "") + "width='100%'";
	}

	getBgColor(): string {
		if (this._autoColor) {
			let lon = this._string.length
			let charIndex = 0;

			for (let i = 0; i < lon; i++)
				charIndex = this._string.charCodeAt(i);

			let colorIndex = charIndex % this._colors_palette.length;
			return this._colors_palette[colorIndex];
		}

		return this._bgcolor;
	}


	public generateAvatar(name: string, w: number, h: number, bgcolor: string, textcolor: string, bgImage: string) {

		let WIDTH = 256;
		let HEIGHT = 256;

		if (w != undefined && w > 0) {
			if (h != undefined && h > 0) {
				WIDTH = w;
				HEIGHT = h;
			}
		}

		var canvas = document.createElement('canvas');
		canvas.id = "ngAvatar-" + Date.now();
		canvas.width = WIDTH;
		canvas.height = HEIGHT;

		var ctx = canvas.getContext('2d');
		ctx.fillStyle = bgcolor;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);

		var _font_size = WIDTH / (2 / (this._font_scale / 100));
		ctx.font = this._font_weight + " " + _font_size + "px sans-serif";

		if (this._text_shadow) {
			ctx.shadowColor = "black";
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 5;
		}

		ctx.textAlign = "center";
		ctx.fillStyle = textcolor;
		ctx.fillText(name, WIDTH / 2, HEIGHT - (HEIGHT / 2) + (_font_size / 3) + 5);

		var img = canvas.toDataURL("image/" + this._picture_format);
		return img;
	};

	getInitialsFromString(string: string) {

		let output = "";
		let i = 0;
		let str = string.split(" ");
		let len = str.length;

		for (i; i < len; i++) if (str[i] != "") output += str[i][0]; //.toUpperCase();
		return output.toUpperCase();
	};


	/* scope variables */
	private _string: string;
	private _long: number = 45;
	private _picture_resolution: number = 256;

	private _extra_classes: string = "";

	private _img_styling: string = "vertical-align:top;";
	private _wrapper_styling: string = "border-radius:0; display:block; overflow:hidden;";
	private _extra_styles: string = "";
	private _corner_radius: string = "0";

	private _picture_format: string = "png";

	private _bgcolor: string = "#E42121";
	private _textcolor: string = "#FFFFFF";
	private _colors_palette: string[] = ["#bdc3c7", "#6f7b87", "#2c3e50", "#2f3193", "#662d91", "#922790", "#ec2176", "#ed1c24", "#f36622", "#f8941e", "#fab70f", "#fdde00", "#d1d219", "#8ec73f", "#00a650", "#00aa9c", "#00adef", "#0081cd", "#005bab"];
	private _font_weight: number = 100;
	private _font_scale: number = 100;

	private _roundShape: boolean = false;
	private _wrapper: boolean = true;
	private _pixelated: boolean = false;
	private _autoColor: boolean = false;
	private _text_shadow: boolean = false;
	public showWrapper: boolean = false;

	private _imgData: string;

}
