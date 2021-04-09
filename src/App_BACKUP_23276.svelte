<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Modal, { store } from "./modal";

  const IDX_HEADER_ID = 6;
  const ROW_CLICK_EVENT_TYPE = "dblclick";
  const MUTATION_OBSERVER_NODE_ID =
    "ctl01_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ListerPanel";

  let headers = [];
  const modalStore = store(false);
  const data = writable();

  let rowClickListeners = [];

  const removeRowClickEventListeners = () => {
    rowClickListeners.forEach((removeListener) => {
      removeListener();
    });
    rowClickListeners = [];
  };

  const addClickHandlersToRows = () => {
    const rows = document.querySelectorAll(".rgMasterTable > tbody > tr");

    rows.forEach((row) => {
      const id = row.querySelectorAll("td")[IDX_HEADER_ID].textContent;
      const handleClickRow = () => {
        $data = getDataFromRow(row);

        modalStore.open();
      };
      row.addEventListener(ROW_CLICK_EVENT_TYPE, handleClickRow);
      rowClickListeners.push(() => {
        row.removeEventListener(ROW_CLICK_EVENT_TYPE, handleClickRow);
      });
    });
  };

  const setupMutationObserver = () => {
    const targetNode = document.getElementById(MUTATION_OBSERVER_NODE_ID);

    const config = { attributes: false, childList: true, subtree: true };

    const callback = function (mutationsList, observer) {
      removeRowClickEventListeners();
      addClickHandlersToRows();
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing

    return () => {
      observer.disconnect();
    };
  };

  const getDataFromRow = (row) => {
    // const dataCells = [...row.querySelectorAll("td")].map(elem=>elem.innerHTML);
    const dataCells = [...row.querySelectorAll("td")].map(
      (elem) => elem.innerHTML
    );
    const data = {};
    dataCells.forEach((val, index) => {
      data[headers[index]] = val;
    });
    return data;
  };

  const getHeaders = () => {
    // const headers = document.querySelectorAll(":not(.rgPager) > .rgMasterTable > thead > tr:not(.rgPager)>th");
    const headers = [
      ...document.querySelectorAll(
        ":not(.rgPager) > .rgMasterTable > thead > tr:not(.rgPager)>th"
      ),
    ].map((elem) => elem.UniqueName);
    return headers;
  };

  onMount(() => {
<<<<<<< Updated upstream
    const removeRowClickListeners = addClickHandlersToRows();
=======
    console.log("mount");

    headers = [
      ...document.querySelectorAll(
        ":not(.rgPager) > .rgMasterTable > thead > tr:not(.rgPager)>th"
      ),
    ].map((elem) => elem.ariaLabel);
    // const removeRowClickListeners = addClickHandlersToRows();
    addClickHandlersToRows();
>>>>>>> Stashed changes
    const removeMutationObserver = setupMutationObserver();
    return () => {
      removeRowClickEventListeners();
      removeMutationObserver();
    };
  });
</script>

<Modal store={modalStore}>
  <div slot="header">Add or Update Speaker</div>
  <div slot="content" class="content">ID: {$data["ID"]}</div>
  <div slot="footer" let:store={{ close }}>
    <button on:click={close}>Close First Modal</button>
  </div></Modal
>

<style>
  .content {
    margin-left: 2em;
    margin-right: 2em;
  }
</style>
