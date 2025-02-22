<template>
  <div class="media-player-placeholder-root-css"
       ref="placeholder"
       v-if="isShowing"
       @click="onClick"
       @focus="onFocus"
       name="placeholder"
       :autofocus='autofocus'
       :focusable="true"
       :style="{'focus-border-color': isMediaTypeFree ? '#FFFFFF' : '#FFD97C'}"
       :enableFocusBorder="true">
    <img class="media-player-placeholder-img-css"
         v-if="isMediaShowing"
         :duplicateParentState="true"
         :focusable="false"
         :enableFocusBorder="false"
         :src="mediaImg"/>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "@vue/runtime-core";
import {IMedia} from "../../../api/media/IMedia";
import {inject, Ref, ref, watch} from "vue";
import {ESFocusable, useESFocus, useESToast} from "@extscreen/es3-core";
import {IMediaAuthorization} from "../../../api/media/IMediaAuthorization";
import {mediaAuthorizationKey} from "../injectionSymbols";
import {IMediaAuthType} from "../../../api/media/IMediaAuthType";

export default defineComponent({
  name: "media-player-placeholder",
  setup(props, context) {
    const focus = useESFocus()
    let media: IMedia
    const mediaImg = ref<string>("")
    const isMediaShowing = ref<boolean>(true)
    const isShowing = ref<boolean>(true)
    const toast = useESToast()
    let autofocus = ref<boolean>(true)
    const placeholder = ref<ESFocusable>()
    const isMediaTypeFree = ref<boolean>(true);

    const mediaAuthorization: Ref<IMediaAuthorization> =
      inject(mediaAuthorizationKey, {} as any)

    watch(
      () => [mediaAuthorization?.value] as const,
      ([auth], [oldAuth]) => {
        if (mediaAuthorization?.value.type == IMediaAuthType.MEDIA_AUTH_TYPE_FREE) {
          isMediaTypeFree.value = true
        } else {
          isMediaTypeFree.value = false
        }
      },
      {flush: 'post'}
    )


    function initMedia(m: IMedia) {
      media = m
      mediaImg.value = m.coverH

      // requestFocus()
    }

    function requestFocus(): void {
      if (placeholder.value) {
        //focus.requestFocusDirectly(placeholder.value!)
      }
    }

    function setAutofocus(enable:boolean){
        autofocus.value = enable
    }

    function showMediaInfo(value: boolean) {
      isMediaShowing.value = value
    }

    function show(value: boolean) {
      isShowing.value = value
    }

    function onClick() {
      context.emit('onPlaceholderClick')
    }

    function onFocus(e) {
      context.emit('onPlaceholderFocus', e.isFocused)
    }

    return {
      placeholder,
      initMedia,
      mediaImg,
      showMediaInfo,
      show,
      isMediaShowing,
      isShowing,
      onClick,
      onFocus,
      requestFocus,
      mediaAuthorization,
      isMediaTypeFree,
        autofocus,
        setAutofocus,
    }
  },
});

</script>

<style scoped>
.media-player-placeholder-root-css {
  width: 898px;
  height: 508px;
  position: absolute;
  left: 86px;
  top: -4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.media-player-placeholder-img-css {
  width: 890px;
  height: 500px;
  background-color: transparent;
}

</style>
