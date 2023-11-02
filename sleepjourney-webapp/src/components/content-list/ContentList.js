import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

import {
  Card,
  ContentListFilter,
  Pagination,
  Slider,
  MontageWall,
} from 'components';
import { getContentList } from 'lib/graphql/getContentList';
import useWidthStyles from 'utils/useWidthStyles';
import GlobalSearchResults from './GlobalSearchResults';
import { clearFilters } from 'lib/slices/filterSlice';
import { selectUiByKey } from 'lib/slices/uiSlice';

const StyledContentList = styled(MuiBox)(
  ({ theme }) => css`
    .contentListTitle {
      margin-top: ${theme.spacing(3)};
    }

    .grid {
      margin-bottom: ${theme.spacing(3)};

      .slick-list {
        .slick-slide {
          padding: ${theme.spacing(0.5, 2)};
        }

        .MuiGrid-grid-sm-6 {
          max-width: 100%;
          flex-basis: 100%;
        }
      }
    }

    .gridItem {
      ${theme.breakpoints.up('sm')} {
        display: flex;
      }
    }

    .slider.MuiGrid-spacing-xs-2 {
      margin: -10px -10px 20px;
    }
  `
);

export default function ContentList(props) {
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [variablesObj, setVariablesObj] = useState({});
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();
  const globalSearch = useSelector(selectUiByKey('globalSearch'));
  let searchFor = filters.search || router.query.search;
  const theme = useTheme();
  const tabletUpView = useMediaQuery(theme.breakpoints.up('sm'));
  const tabletDownView = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  // Clear Search is select reset searchFor
  if (filters.search === '_clear') {
    searchFor = '';
  }

  useEffect(() => {
    // For category pages only
    if (router.pathname === '/news/[category]') {
      searchFor = '';
      filters.search = '_clear';
    }
  }, [router.query.category]);

  useEffect(() => {
    // Global search takes place so update search field state
    if (globalSearch.endValue && globalSearch.endValue !== searchFor) {
      applyFiltersSearch(globalSearch.endValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalSearch.endValue]);

  useEffect(() => {
    const { sources, customContentList } = props;

    async function fetchMyAPI(variables) {
      setLoading(true);
      const response = await getContentList(variables);

      if (sources.excludePost) {
        const newPosts = response.documents.reduce(
          (previousValue, currentValue) => {
            if (
              currentValue.id !== sources.excludePost &&
              previousValue.length < 3
            ) {
              previousValue.push(currentValue);
            }

            return previousValue;
          },
          []
        );

        setPosts({
          result_count: response.result_count,
          documents: newPosts,
        });
      } else {
        setPosts(response);
      }
      setLoading(false);
    }

    if (
      sources.mode === 'search-filter' ||
      sources.mode === 'global-search-filter' ||
      sources.mode === 'child'
    ) {
      const variables = {};
      if (sources.contentType) {
        variables['contentType'] = sources.contentType;
      }
      if (sources.subtype) {
        variables['subtype'] = sources.subtype;
      }
      variables['sortRule'] = sources.sortRule === 'date' ? 'created' : 'title';
      variables['sortingDirection'] =
        sources.sortingDirection === 'desc' ? 'DESC' : 'ASC';

      if (sources.mode === 'global-search-filter') {
        variables['sortRule'] = null;
        variables['sortingDirection'] = null;
      }

      variables['maxArticles'] = parseInt(sources.maxArticles);

      // For search & filter: override with user's filters selection
      variables['categories'] = filters.categories;

      if (customContentList || sources?.categories?.length > 0) {
        variables['categories'] = sources.categories;
      }

      // For search & filter: override with user's filters selection
      variables['tags'] = filters.tags;
      if (sources?.tags?.length > 0) {
        // TODO: What should happen if both filters.tags & sources.tags exist
        variables['tags'] = sources.tags;
      }

      // Only for news page
      if (router?.query?.alias?.length === 1) {
        if (router?.query?.alias[0] === 'news') {
          const tagName = router.query.tag;
          if (tagName) {
            variables['tagsName'] = tagName;
            variables['tags'] = [];
          }
        }
      }

      variables['dateRange'] = filters.dateRange;

      if (filters?.sortBy?.value && filters.sortBy.value !== 'relevance') {
        variables['sortRule'] = 'created';
        variables['sortingDirection'] =
          filters.sortBy.value === 'newest' ? 'DESC' : 'ASC';
      }
      variables['search'] = searchFor;
      variables['offset'] = 0;

      // Filters changes / reset offset
      setOffset(0);

      setVariablesObj(variables);
      fetchMyAPI(variables);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, router.query.tag, router.query.category]);

  // Selected Posts / Get From API
  useEffect(() => {
    const { sources, children } = props;

    async function fetchMyAPI(variables) {
      setLoading(true);
      const response = await getContentList(variables);
      setSelectedPosts(response);
      setLoading(false);
    }

    if (sources.mode === 'selected') {
      const variables = {};
      variables['selectedIds'] = [];
      variables['offset'] = 0;
      variables['maxArticles'] = 100;
      children.map((contentProps) => {
        const { props } = contentProps;
        variables['selectedIds'].push(props.post.id);
      });
      fetchMyAPI(variables);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(clearFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    anchor,
    showImages,
    showDate,
    showCategory,
    showDescription,
    showShareIcons,
    searchFilter,
    sources,
    contentStyle,
    title,
    children,
    className,
    widthControlExt,
    showTags,
  } = props;

  const tagsData = useSelector(selectUiByKey('tagsData'));
  const categoriesData = useSelector(selectUiByKey('categoriesData'));
  const widthStyles = useWidthStyles(widthControlExt);

  // TODO: Phase1 link to content list styles, phase 2 link to choice overlay
  const tempColumns = contentStyle || [2];

  // [1, 2, 3] => [12, 6, 6, 4, 4, 4]
  const grid = tempColumns.reduce((acc, cur) => {
    const cols = 12 / cur;
    const arr = Array(cur).fill(cols);
    return acc.concat(arr);
  }, []);

  const applyFiltersSearch = (searchTxt) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, search: searchTxt };
    });
  };

  const applyFilters = (obj, clear) => {
    if (clear) {
      setFilters(obj);
    } else {
      setFilters((prevFilters) => {
        return { ...prevFilters, ...obj };
      });
    }
  };

  async function loadMoreArticles() {
    setLoadingMore(true);
    const nextPage = offset + variablesObj.maxArticles;
    setOffset(nextPage);

    // not category news case
    if (grid.length !== 2) {
      // case of medium screen
      if (window.innerWidth <= 980 && window.innerWidth > 375)
        variablesObj['maxArticles'] = 12;
      // case of largen and small screen
      else variablesObj['maxArticles'] = 9;
    }

    variablesObj['offset'] = nextPage;

    // Load next set of articles

    const response = await getContentList(variablesObj);
    const newPosts = posts.documents.concat(response.documents);

    setPosts({
      result_count: response.result_count,
      documents: newPosts,
      search: posts.search,
    });
    setLoadingMore(false);
  }

  const getPostById = (id) => {
    let tmpPost = {};
    if (selectedPosts && selectedPosts.documents) {
      selectedPosts.documents.forEach((post) => {
        if (String(post.id) === String(id)) {
          tmpPost = post;
        }
      });
    }
    return tmpPost;
  };

  const imageAspectRatio = /square-image/.test(className) ? '1:1' : '16:9';
  const isMontageWall = /is-style-montage-layout/.test(className);
  const hasOneItem = children?.length === 1 || posts?.documents?.length === 1;

  // slider settings
  const sliderSettings = {
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick',
      },
      {
        breakpoint: 992,
      },
      {
        breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
        settings: 'unslick',
      },
    ],
  };

  return (
    <>
      {(sources.mode === 'search-filter' ||
        sources.mode === 'global-search-filter') && (
        <ContentListFilter
          categories={categoriesData}
          tags={tagsData}
          searchFilter={searchFilter}
          sources={sources}
          applyFilters={applyFilters}
          searchFor={searchFor || ''}
        />
      )}
      {title.toggle && title.text && !isMontageWall && (
        <MuiTypography
          className="contentListTitle"
          variant="h2"
          align="left"
          dangerouslySetInnerHTML={{ __html: title.text }}
        />
      )}
      {sources.mode === 'selected' && (
        <StyledContentList sx={{ ...widthStyles }}>
          <MuiGrid
            id={anchor}
            container
            spacing={isMontageWall ? 0 : 2}
            className={clsx({
              grid: !hasOneItem,
              slider:
                contentStyle[0] === 3 &&
                children.length < 4 &&
                tabletUpView &&
                tabletDownView,
            })}
          >
            {(contentStyle[0] === 3 &&
              children.length < 4 &&
              tabletUpView &&
              tabletDownView) ||
            isMontageWall ? (
              isMontageWall ? (
                <MontageWall title={title} getPostById={getPostById}>
                  {children}
                </MontageWall>
              ) : (
                <Slider
                  appearance="default"
                  arrows
                  slidesToShow={2}
                  slidesToScroll={1}
                  {...sliderSettings}
                >
                  {children.map((contentProps, index) => {
                    const { props } = contentProps;
                    const childPost = getPostById(props.post.id);

                    // In case the post does not exist any more
                    if (!childPost.id) {
                      return;
                    }

                    return contentItem(
                      childPost,
                      [6, 6, 6],
                      index,
                      showImages,
                      showDescription,
                      imageAspectRatio,
                      showDate,
                      showCategory,
                      props.link?.openAs,
                      showTags,
                      showShareIcons
                    );
                  })}
                </Slider>
              )
            ) : (
              children.map((contentProps, index) => {
                const { props } = contentProps;
                const childPost = getPostById(props.post.id);

                // In case the post does not exist any more
                if (!childPost.id) {
                  return;
                }

                return contentItem(
                  childPost,
                  grid,
                  index,
                  showImages,
                  showDescription,
                  imageAspectRatio,
                  showDate,
                  hasOneItem,
                  showCategory,
                  props.link?.openAs,
                  showTags,
                  showShareIcons
                );
              })
            )}
          </MuiGrid>
        </StyledContentList>
      )}
      {sources.mode === 'global-search-filter' && (
        <GlobalSearchResults posts={posts} loading={loading} />
      )}
      {(sources.mode === 'child' || sources.mode === 'search-filter') &&
        loading &&
        'Loading...'}
      {(sources.mode === 'child' || sources.mode === 'search-filter') &&
        !loading &&
        (posts.result_count > 0 ? (
          <StyledContentList sx={{ ...widthStyles }}>
            <MuiGrid
              id={anchor}
              container
              spacing={2}
              className={clsx({
                grid: !hasOneItem,
                slider:
                  contentStyle[0] === 3 &&
                  posts.documents.length < 4 &&
                  tabletUpView &&
                  tabletDownView,
              })}
            >
              {contentStyle[0] === 3 &&
              posts.documents.length < 4 &&
              tabletUpView &&
              tabletDownView ? (
                <Slider
                  appearance="default"
                  arrows
                  slidesToShow={2}
                  slidesToScroll={1}
                  {...sliderSettings}
                >
                  {posts.documents.map((contentProps, index) => {
                    if (!contentProps) {
                      return;
                    }
                    // No image is selected hide the web-story
                    const { type, heroImageUrl, heroImage, thumbnailImage } =
                      contentProps;
                    if (
                      type === 'web_stories' &&
                      !heroImageUrl &&
                      !heroImage &&
                      !thumbnailImage
                    ) {
                      return;
                    }

                    return contentItem(
                      contentProps,
                      grid,
                      index,
                      showImages,
                      showDescription,
                      imageAspectRatio,
                      showDate,
                      showCategory,
                      undefined,
                      showTags,
                      showShareIcons
                    );
                  })}
                </Slider>
              ) : (
                posts.documents.map((contentProps, index) => {
                  if (!contentProps) {
                    return;
                  }
                  // No image is selected hide the web-story
                  const { type, heroImageUrl, heroImage, thumbnailImage } =
                    contentProps;
                  if (
                    type === 'web_stories' &&
                    !heroImageUrl &&
                    !heroImage &&
                    !thumbnailImage
                  ) {
                    return;
                  }
                  return contentItem(
                    contentProps,
                    grid,
                    index,
                    showImages,
                    showDescription,
                    imageAspectRatio,
                    showDate,
                    hasOneItem,
                    showCategory,
                    undefined,
                    showTags,
                    showShareIcons
                  );
                })
              )}
            </MuiGrid>
          </StyledContentList>
        ) : (
          <p>No results found</p>
        ))}
      {(sources.mode === 'search-filter' ||
        sources.mode === 'global-search-filter') &&
        searchFilter?.pagination && (
          <MuiBox display="flex" justifyContent="center" mb={3}>
            <Pagination
              type={searchFilter?.paginationType}
              loadMoreArticles={() => loadMoreArticles()}
              disabled={
                posts.result_count === posts.documents?.length || loadingMore
              }
              noPost={posts.result_count === posts.documents?.length}
            />
          </MuiBox>
        )}
    </>
  );
}

function contentItem(
  contentPropsObj,
  grid,
  index,
  showImages,
  showDescription,
  imageAspectRatio,
  showDate,
  hasOneItem = false,
  showCategory,
  openAs,
  showTags,
  showShareIcons
) {
  const {
    id,
    description,
    heroImageUrl,
    heroImage,
    thumbnailImage,
    url,
    title,
    created,
    createdTime,
    category,
    categoryColour: categoryColor,
    fieldCategory,
    categoryAlias,
    tags,
    type,
    body,
  } = contentPropsObj;
  const len = grid.length;
  const column = index < len ? grid[index] : grid[len - 1];

  return (
    <MuiGrid
      className="gridItem"
      key={`${id}-${index}`}
      item
      xs={12}
      sm={column === 12 ? 12 : 6}
      md={column}
    >
      <Card
        firstCard={column === 12 && len > 1}
        singleColumn={len === 1}
        showImage={showImages}
        showDate={showDate}
        showCategory={showCategory}
        showTitle={true}
        showDescription={showDescription}
        showShareIcons={showShareIcons}
        showLink={true}
        noCard={hasOneItem && !showImages && column === 12}
        image={{
          url:
            heroImageUrl ||
            (thumbnailImage &&
              process.env.NEXT_PUBLIC_ASSET_PREFIX_URL + thumbnailImage) ||
            (heroImage && process.env.NEXT_PUBLIC_ASSET_PREFIX_URL + heroImage),
          aspectRatio: imageAspectRatio,
        }}
        date={created || (createdTime && formatDate(createdTime))}
        category={category || fieldCategory?.entity?.name}
        title={title}
        link={{ url, openAs: type === 'web_stories' ? 'new-tab' : openAs }}
        description={description}
        categoryColor={categoryColor}
        categoryAlias={categoryAlias}
        showTags={showTags}
        tags={tags}
        body={body}
      />
    </MuiGrid>
  );
}

function formatDate(timestamp) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date(timestamp * 1000);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}
