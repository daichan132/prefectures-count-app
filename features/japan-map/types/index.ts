type Geometry = {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
};

export interface FeatureProperties {
  featurecla: string;
  scalerank: number;
  adm1_code: string;
  diss_me: number;
  iso_3166_2: string;
  wikipedia: null | string;
  iso_a2: string;
  adm0_sr: number;
  name: string;
  name_alt: null | string;
  name_local: string;
  type: string;
  type_en: string;
  code_local: null | string;
  code_hasc: string;
  note: null | string;
  hasc_maybe: string;
  region: string;
  region_cod: string;
  provnum_ne: number;
  gadm_level: number;
  check_me: number;
  datarank: number;
  abbrev: null | string;
  postal: null | string;
  area_sqkm: number;
  sameascity: number;
  labelrank: number;
  name_len: number;
  mapcolor9: number;
  mapcolor13: number;
  fips: string;
  fips_alt: string;
  woe_id: number;
  woe_label: string;
  woe_name: string;
  latitude: number;
  longitude: number;
  sov_a3: string;
  adm0_a3: string;
  adm0_label: number;
  admin: string;
  geonunit: string;
  gu_a3: string;
  gn_id: number;
  gn_name: string;
  gns_id: number;
  gns_name: string;
  gn_level: number;
  gn_region: null | string;
  gn_a1_code: string;
  region_sub: null | string;
  sub_code: null | string;
  gns_level: number;
  gns_lang: string;
  gns_adm1: string;
  gns_region: null | string;
  min_label: number;
  max_label: number;
  min_zoom: number;
  wikidataid: string;
  name_ar: string;
  name_bn: string;
  name_de: string;
  name_en: string;
  name_es: string;
  name_fr: string;
  name_el: string;
  name_hi: string;
  name_hu: string;
  name_id: string;
  name_it: string;
  name_ja: string;
  name_ko: string;
  name_nl: string;
  name_pl: string;
  name_pt: string;
  name_ru: string;
  name_sv: string;
  name_tr: string;
  name_vi: string;
  name_zh: string;
  ne_id: number;
  layer: string;
  path: string;
}

export interface Feature {
  type: 'Feature';
  geometry: Geometry;
  properties: FeatureProperties;
}

export type List = {
  name: string;
  count: number;
};
