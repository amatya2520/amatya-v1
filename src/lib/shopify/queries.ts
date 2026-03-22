// Query for collection-specific banners (metaobjects)
export const COLLECTION_BANNERS_QUERY = `
  query CollectionBanners($first: Int = 20) {
    metaobjects(type: "collection_banner", first: $first) {
      edges {
        node {
          id
          type
          fields {
            key
            value
            reference {
              ... on Collection {
                handle
              }
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
// Shopify GraphQL Queries

export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int = 50) {
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
          products(first: 250) {
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
      products(first: 250) {
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
      productSections: metafield(namespace: "custom", key: "product_sections") {
        type
        reference {
          ... on Metaobject {
            id
            type
            title: field(key: "title") { value }
            heading: field(key: "heading") { value }
            body: field(key: "body") { value }
            content: field(key: "content") { value }
            sectionType: field(key: "section_type") { value }
            typeField: field(key: "type") { value }
            items: field(key: "items") { value }
            listItems: field(key: "list_items") { value }
            bullets: field(key: "bullets") { value }
            order: field(key: "order") { value }
          }
        }
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                id
                type
                title: field(key: "title") { value }
                heading: field(key: "heading") { value }
                body: field(key: "body") { value }
                content: field(key: "content") { value }
                sectionType: field(key: "section_type") { value }
                typeField: field(key: "type") { value }
                items: field(key: "items") { value }
                listItems: field(key: "list_items") { value }
                bullets: field(key: "bullets") { value }
                order: field(key: "order") { value }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_RECOMMENDATIONS_QUERY = `
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      handle
      title
      description
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
          text: field(key: "text") {
            value
          }
          is_active: field(key: "is_active") {
            value
          }
          order: field(key: "order") {
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
          background_image: field(key: "background_image") {
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
                description
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
          video: field(key: "video") {
            reference {
              ... on Video {
                sources {
                  url
                  mimeType
                }
                previewImage {
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
export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;