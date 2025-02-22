import {MediaItemList} from "./MediaItemList";

export interface Media {
  //
  id: string
  assetTitle: string
  assetSubTitle: string
  assetType: string
  compositeScore: string

  tags: string
  categoryName: string
  categorySubName: string
  coverH: string
  coverV: string
  directors: string
  actors: string
  publishTime: string
  language: string
  licenceNum: string

  //
  description1: string
  description2: string
  description3: string

  //
  description: string

  cornerContent: string
  cornerColor: string
  cornerGradient: string
  doubanScore: string

  //
  dataItems?: Array<MediaItemList>
  index: number,
  playerType: number

  //分集的总数
  episodeCount: number
<<<<<<< HEAD
=======

  //付费类型
  feeType: string
>>>>>>> 3dca11d7994d00d5912e48c811b4802207e9a3c5
}
