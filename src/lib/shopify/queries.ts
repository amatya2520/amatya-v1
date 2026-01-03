// Shopify GraphQL Queries

export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
          products(first: 10) {
            edges {
              node {
                id
                handle
                title
                description
                tags
                images(first: 2) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      price {
                        amount
                      }
                      compareAtPrice {
                        amount
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
          }
          metafield(namespace: "custom", key: "short_description") {
            value
          }
        }
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            tags
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
      metafield(namespace: "custom", key: "short_description") {
        value
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      tags
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      collections(first: 1) {
        edges {
          node {
            handle
            title
          }
        }
      }
    }
  }
`;

export const PRODUCTS_BY_TAG_QUERY = `
  query GetProductsByTag($query: String!, $first: Int = 10) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          title
          description
          tags
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          collections(first: 1) {
            edges {
              node {
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const ANNOUNCEMENTS_QUERY = `
  query GetAnnouncements {
    metaobjects(type: "announcement", first: 10) {
      edges {
        node {
          id
          field(key: "text") {
            value
          }
        }
      }
    }
  }
`;

export const HERO_BANNERS_QUERY = `
  query GetHeroBanners {
    metaobjects(type: "hero_banner", first: 10) {
      edges {
        node {
          id
          field(key: "background_image") {
            reference {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
          badge_text: field(key: "badge_text") {
            value
          }
          heading: field(key: "heading") {
            value
          }
          description: field(key: "description") {
            value
          }
          cta_text: field(key: "cta_text") {
            value
          }
          cta_link: field(key: "cta_link") {
            value
          }
        }
      }
    }
  }
`;

export const REVIEWS_QUERY = `
  query GetReviews {
    metaobjects(type: "customer_review", first: 10) {
      edges {
        node {
          id
          rating: field(key: "rating") {
            value
          }
          review_text: field(key: "review_text") {
            value
          }
          customer_name: field(key: "customer_name") {
            value
          }
          customer_city: field(key: "customer_city") {
            value
          }
          product: field(key: "product") {
            reference {
              ... on Product {
                id
                handle
                title
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
          image: field(key: "image") {
            reference {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
