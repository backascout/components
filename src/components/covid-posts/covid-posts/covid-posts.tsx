import { Component, Host, h, State, Prop } from '@stencil/core';
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

interface Post {
  id: number;
  link: string;
  content: {
    rendered: string;
    protected: boolean;
  };
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
}

@Component({
  tag: 'covid-posts',
  styleUrl: 'covid-posts.css',
})
export class CovidPosts {
  @Prop({ reflect: true }) host: string;

  @State() posts: Post[];
  @State() postsLoading: boolean = true;
  @State() postsFetchError: unknown = null;

  componentDidLoad() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsLoading = true;

    fetch(
      `${this.host}/wp-json/wp/v2/posts?_fields=id,content,excerpt,featured_media,title,link&search=covid-news&per_page=100`,
    )
      .then(checkStatus)
      .then(parseJSON)
      .then((posts: Post[]) => {
        this.posts = posts.filter(post =>
          post.content.rendered.includes(
            '<script type="text/javascript" class="covid-news"></script>',
          ),
        );
      })
      .catch(error => {
        this.postsFetchError = error;
      })
      .finally(() => {
        this.postsLoading = false;
      });
  }

  get postRows(): Post[][] {
    const result = [];

    // Put three posts in each row
    for (let i = 0; i < this.posts.length; i += 3) {
      result.push(this.posts.slice(i, i + 3));
    }

    return result;
  }

  stripHTML(str: string) {
    return str.replace(/<!--[\s\S]*?-->/g, '') // Strip HTML comments
      .replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
  }

  render() {
    return (
      <Host>
        <div class="covid-posts">
          {this.postsLoading && (
            <div class="covid-posts__spinner">
              <loading-spinner></loading-spinner>
            </div>
          )}
          {!this.postsLoading && (
            <backascout-grid>
              {this.postRows.map(postRow => (
                <backascout-row>
                  {postRow.map(post => (
                    <backascout-col width="12" width-md="6" width-lg="4">
                      <covid-post
                        key={post.id}
                        host={this.host}
                        postMediaId={post.featured_media}
                        postLink={post.link}
                        postTitle={post.title.rendered}
                        postExcerpt={this.stripHTML(post.excerpt.rendered)}
                      ></covid-post>
                    </backascout-col>
                  ))}
                </backascout-row>
              ))}
            </backascout-grid>
          )}
        </div>
      </Host>
    );
  }
}
