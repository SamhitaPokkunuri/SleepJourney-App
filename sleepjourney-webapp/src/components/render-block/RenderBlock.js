//Application dependencies
import React from 'react';

// Vendor and internal dependencies
import {
  Animation,
  Accordion,
  AccordionItem,
  Audio,
  AvailableCountries,
  Banner,
  BannerCarousel,
  Button,
  Buttons,
  CardList,
  Carousel,
  Column,
  Columns,
  ContentList,
  DynamicAnimation,
  Embed,
  File,
  FileList,
  Group,
  HeadingPreRender,
  Html,
  IconFeature,
  IconFeatures,
  Icon,
  Image,
  Instagram,
  Issuu,
  LargeNumber,
  ListPreRender,
  MediaText,
  MissingBlock,
  ParagraphPreRender,
  Quote,
  Section,
  SocialFeed,
  SocialProfiles,
  SocialShare,
  Spacer,
  Separator,
  TabPreRender,
  TabsPreRender,
  Table,
  Twitter,
  Video,
  Spotify,
  Vimeo,
  Youtube,
  Charts,
  FaqFeedback,
  GlobeMap,
  SDGList,
  InpageNavigation,
  InpageLink,
  SdgGrid,
  RoamingHubServices,
  RoamingHubServicesItem,
  Slider,
  ProfessionalServices,
  ProfessionalServicesItem,
} from 'components';

export default function RenderBlock(block, index, array, customHeader) {
  // do not render Custom Header unless meta data is true
  if (!customHeader && block.attributes.variation === 'header') {
    return;
  }

  const mapBlocksToComponent = {
    'vdfblocks/animation': Animation,
    'vdfblocks/dynamic-animation': DynamicAnimation,
    'vdfblocks/accordion': Accordion,
    'vdfblocks/accordion-item': AccordionItem,
    'vdfblocks/available-countries': AvailableCountries,
    'vdfblocks/banner-carousel': BannerCarousel,
    'vdfblocks/banner': Banner,
    'vdfblocks/card': CardList,
    'vdfblocks/carousel': Carousel,
    'vdfblocks/charts': Charts,
    'core/button': Button,
    'vdfblocks/button': Button,
    'core/buttons': Buttons,
    'vdfblocks/button-group': Buttons,
    'core/column': Column,
    'core/columns': Columns,
    'vdfblocks/content-list': ContentList,
    'vdfblocks/iframe': Embed,
    'core/file': File,
    'vdfblocks/file-list': FileList,
    'core-embed/instagram': Instagram,
    'core-embed/issuu': Issuu,
    'core-embed/twitter': Twitter,
    'core/group': Group,
    'core/heading': HeadingPreRender,
    'core/html': Html,
    'vdfblocks/icon': Icon,
    'vdfblocks/features': IconFeatures,
    'vdfblocks/feature': IconFeature,
    'core/image': Image,
    'vdfblocks/large-number': LargeNumber,
    'core/list': ListPreRender,
    'vdfblocks/media-text': MediaText,
    'core/paragraph': ParagraphPreRender,
    'core/quote': Quote,
    'core-embed/spotify': Spotify,
    'vdfblocks/section': Section,
    'vdfblocks/social-feed': SocialFeed,
    'vdfblocks/social-profiles': SocialProfiles,
    'vdfblocks/social-share': SocialShare,
    'core/spacer': Spacer,
    'core/separator': Separator,
    'vdfblocks/tab': TabPreRender,
    'vdfblocks/tabs': TabsPreRender,
    'core/table': Table,
    'core/video': Video,
    'core-embed/vimeo': Vimeo,
    'core-embed/youtube': Youtube,
    'core/audio': Audio,
    'vdfblocks/faq-feedback': FaqFeedback,
    'vdfblocks/globe-map': GlobeMap,
    'vdfblocks/sdg-list': SDGList,
    'vdfblocks/inpage-navigation': InpageNavigation,
    'vdfblocks/inpage-link': InpageLink,
    'vdfblocks/sdg-grid': SdgGrid,
    'vdfblocks/simple-content-list': SDGList,
    'vdfblocks/roaming-hub-services': RoamingHubServices,
    'vdfblocks/roaming-hub-services-item': RoamingHubServicesItem,
    'vdfblocks/slider': Slider,
    'vdfblocks/professional-services': ProfessionalServices,
    'vdfblocks/professional-services-item': ProfessionalServicesItem,
  };

  const len = array.length;
  const prevSiblingBlock = array[index === 0 ? null : index - 1];
  const nextSiblingBlock = array[index === len - 1 ? null : index + 1];

  const combinedWithAttributes = Object.assign({}, block.attributes, {
    key: block.clientId,
    name: block.name,
    prevSiblingBlock,
    nextSiblingBlock,
  });

  if (typeof mapBlocksToComponent[block.name] !== 'undefined') {
    return React.createElement(
      // The type of component to render
      mapBlocksToComponent[block.name],
      // The props to be passed
      combinedWithAttributes,
      // The children to be passed if they exist
      block.innerBlocks &&
        block.innerBlocks.map((childBlock, index, array) => {
          return RenderBlock(childBlock, index, array);
        })
    );
  }

  // component doesn't exist yet
  return React.createElement(MissingBlock, combinedWithAttributes);
}
