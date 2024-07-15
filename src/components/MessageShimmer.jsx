import React from "react";

const MessageShimmer = () => {
  return (
    <div
      role="status"
      class="space-y-2.5 animate-pulse w-full h-full flex flex-col justify-evenly items-start"
    >
      <div class="flex items-center w-full">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[90%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[50%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[60%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[40%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[30%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[80%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[30%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[20%]"></div>
      </div>
      <div class="flex items-center w-full ">
        <div class="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-[60%]"></div>
      </div>
    </div>
  );
};

export default MessageShimmer;
