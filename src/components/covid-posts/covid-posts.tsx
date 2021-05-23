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

    fetch(`${this.host}/wp-json/wp/v2/posts?_fields=id,content,excerpt,featured_media,title,link&search=covid-news&per_page=100`)
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
            <section class="covid-posts__posts">
              {this.posts.map(post => (
                <covid-post
                  key={post.id}
                  host={this.host}
                  postMediaId={post.featured_media}
                  postLink={post.link}
                  postTitle={post.title.rendered}
                  postExcerpt={post.excerpt.rendered}
                ></covid-post>
              ))}
            </section>
          )}
        </div>
      </Host>
    );
  }
}
