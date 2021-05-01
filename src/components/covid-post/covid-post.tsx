import { Component, Host, h, Prop, State } from '@stencil/core';
import 'whatwg-fetch';

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    (error as any).response = response;
    throw error;
  }
}

function parseJSON(response: Response) {
  return response.json();
}

type MediaSize =
  | 'thumbnail'
  | 'medium'
  | 'medium_large'
  | 'post-card'
  | 'partner-logo'
  | 'component-square'
  | 'component-board'
  | 'full';

interface Media {
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key in MediaSize]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
}

@Component({
  tag: 'covid-post',
  styleUrl: 'covid-post.css',
})
export class CovidPost {
  @Prop({ reflect: true }) host: string;
  @Prop({ reflect: true }) postMediaId?: number;
  @Prop({ reflect: true }) postLink: string;
  @Prop({ reflect: true }) postTitle: string;
  @Prop({ reflect: true }) postExcerpt: string;

  @State() mediaURL: string;
  @State() mediaLoading: boolean = false;
  @State() mediaFetchError: unknown = null;

  componentDidLoad() {
    if (this.postMediaId) {
      this.fetchMedia(this.postMediaId);
    }
  }

  fetchMedia(id: number) {
    this.mediaLoading = true;

    fetch(`${this.host}/wp-json/wp/v2/media/${id}?_fields=media_details`)
      .then(checkStatus)
      .then(parseJSON)
      .then((media: Media) => {
        this.mediaURL = media.media_details.sizes['post-card'].source_url;
      })
      .catch(error => {
        this.mediaFetchError = error;
      })
      .finally(() => {
        this.mediaLoading = false;
      });
  }

  render() {
    return (
      <Host>
        <article class="covid-post mb-5 post-card">
          <a href={this.postLink} class="d-flex post-card--wrapper h-100">
            <div class="d-flex flex-column justify-content-start post-card--inner w-100">
              {!this.mediaLoading && this.mediaURL && (
                <figure class="post-card--img">
                  <img
                    width="720"
                    height="544"
                    src={this.mediaURL}
                    class="attachment-post-card size-post-card wp-post-image"
                    alt=""
                    loading="lazy"
                  />
                </figure>
              )}

              <div class="post-card--body">
                <div class="container-fluid entry-content text-center">
                  <h3 class="h2 mt-5 mt-md-3">{this.postTitle}</h3>

                  <div innerHTML={this.postExcerpt} />
                </div>
              </div>

              <figure class="post-card--badge">
                <span class="py-1 px-2">Scoutkåren</span>
              </figure>
            </div>
          </a>
        </article>
      </Host>
    );
  }
}
